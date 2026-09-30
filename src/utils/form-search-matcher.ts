/**
 * Legal Form Search Matcher & True Semantic Scoring Engine
 * Analyzes query intent, core topic entities vs. procedural words,
 * uses exact whole-word boundary matching, and calculates honest match percentages.
 */

// Stop words / functional words in Vietnamese legal search
export const STOP_WORDS = new Set([
  'về', 'việc', 'của', 'và', 'cho', 'ở', 'tại', 'trong', 'theo', 'quy',
  'định', 'xin', 'các', 'những', 'một', 'này', 'đó', 'là', 'được', 'do'
]);

// Procedural prefixes that appear in almost all legal documents
export const PROCEDURAL_PREFIXES = [
  'mẫu số', 'mẫu', 'tờ khai', 'bản khai', 'giấy khai', 'giấy đề nghị',
  'giấy xác nhận', 'giấy cam kết', 'giấy', 'đơn xin', 'đơn yêu cầu',
  'đơn đề nghị', 'đơn khởi kiện', 'đơn', 'hợp đồng', 'biên bản',
  'thông báo', 'báo cáo', 'quyết định', 'văn bản', 'phụ lục'
];

// Recognized legal topic domains and their keyword clusters
export const TOPIC_DOMAINS: Record<string, string[]> = {
  xe: ['xe', 'ô tô', 'xe máy', 'xe cơ giới', 'biển số', 'phương tiện giao thông', 'đăng kiểm', 'bằng lái'],
  dat_dai: ['đất', 'nhà đất', 'sổ đỏ', 'sổ hồng', 'bất động sản', 'thửa đất', 'quyền sử dụng đất', 'địa chính', 'chung cư', 'căn hộ'],
  ly_hon: ['ly hôn', 'hôn nhân', 'kết hôn', 'vợ chồng', 'nuôi con', 'cấp dưỡng', 'ly thân'],
  lao_dong: ['lao động', 'tiền lương', 'tiền công', 'nghỉ việc', 'sa thải', 'thử việc', 'bảo hiểm xã hội', 'bhxh'],
  thua_ke: ['thừa kế', 'di chúc', 'di sản', 'hàng thừa kế'],
  doi_no: ['đòi nợ', 'vay tiền', 'mượn tiền', 'công nợ', 'vay tài sản', 'thanh toán nợ'],
  thue: ['thuế', 'hóa đơn', 'thu nhập cá nhân', 'pit', 'vat', 'mã số thuế', 'kê khai thuế'],
  doanh_nghiep: ['doanh nghiệp', 'công ty', 'thành lập', 'điều lệ', 'cổ phần', 'thành viên', 'hội đồng'],
  ho_khau: ['tạm trú', 'thường trú', 'hộ khẩu', 'căn cước', 'định danh', 'ct01', 'na8'],
  chung_khoan: ['chứng khoán', 'cổ phiếu', 'trái phiếu', 'sàn giao dịch chứng khoán'],
  cac_bon: ['các-bon', 'carbon', 'tín chỉ các-bon', 'giao dịch các-bon'],
};

export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Checks if a word exists in a text as a standalone word (not a substring of another word like 'xe' in 'xét')
 */
export function containsWord(text: string, word: string): boolean {
  if (!text || !word) return false;
  const pattern = new RegExp(`(^|[^a-zà-ỹ0-9])${escapeRegExp(word)}([^a-zà-ỹ0-9]|$)`, 'i');
  return pattern.test(text);
}

export interface MatchScoreResult {
  isMatch: boolean;
  matchPercent: number; // 0 to 100
  score: number;
  reason?: string;
}

/**
 * Calculates genuine match percentage between user search query and form.
 * Ensures that if a query targets a specific topic (e.g. 'xe'),
 * an unrelated document (e.g. 'cac-bon' or 'chung-khoan') gets 0% and is rejected.
 */
export function calculateFormMatch(
  query: string,
  form: { title: string; description?: string; content?: string; category?: string }
): MatchScoreResult {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) {
    return { isMatch: false, matchPercent: 0, score: 0 };
  }

  const titleLower = (form.title || '').toLowerCase();
  const descLower = (form.description || '').toLowerCase();
  const catLower = (form.category || '').toLowerCase();

  // 1. EXACT PHRASE MATCH IN TITLE (Highest relevance)
  if (titleLower.includes(cleanQ)) {
    const lengthRatio = cleanQ.length / Math.max(1, titleLower.length);
    const pct = Math.min(99, Math.round(94 + lengthRatio * 5));
    return { isMatch: true, matchPercent: pct, score: 10 + pct / 10 };
  }

  // Also check without tones for exact phrase
  const cleanQNoTone = removeVietnameseTones(cleanQ);
  const titleNoTone = removeVietnameseTones(titleLower);
  if (titleNoTone.includes(cleanQNoTone)) {
    return { isMatch: true, matchPercent: 93, score: 18 };
  }

  // 2. Identify tokens and topic entities in user query
  const queryTokens = cleanQ.split(/\s+/).filter(w => w.length >= 2 && !STOP_WORDS.has(w));
  if (queryTokens.length === 0) {
    return { isMatch: false, matchPercent: 0, score: 0 };
  }

  // Check if query belongs to a known topic domain
  const detectedDomains: string[] = [];
  for (const [domainKey, keywords] of Object.entries(TOPIC_DOMAINS)) {
    for (const kw of keywords) {
      if (cleanQ.includes(kw)) {
        detectedDomains.push(domainKey);
        break;
      }
    }
  }

  // If user explicitly queried a domain (e.g. 'xe', 'cac_bon', 'chung_khoan', 'ly_hon'),
  // verify if this form has ANY relevance to that domain!
  if (detectedDomains.length > 0) {
    let matchesDomain = false;
    for (const domain of detectedDomains) {
      const domainKeywords = TOPIC_DOMAINS[domain];
      for (const dKw of domainKeywords) {
        if (containsWord(titleLower, dKw) || containsWord(descLower, dKw)) {
          matchesDomain = true;
          break;
        }
      }
      if (matchesDomain) break;
    }

    // CRUCIAL ANTI-FALSE-POSITIVE:
    // If query has a specific subject (like 'xe') and form has ZERO domain keywords,
    // IT IS 100% UNRELATED. Even if words like 'đăng ký' or 'mẫu' match!
    if (!matchesDomain) {
      return { isMatch: false, matchPercent: 0, score: 0, reason: 'Topic mismatch' };
    }
  }

  // 3. Keyword Coverage Calculation using standalone whole-word checking
  let matchedTokensInTitle = 0;
  let matchedTokensInDesc = 0;

  for (const token of queryTokens) {
    if (containsWord(titleLower, token)) {
      matchedTokensInTitle++;
    } else if (containsWord(descLower, token) || containsWord(catLower, token)) {
      matchedTokensInDesc++;
    }
  }

  const titleCoverage = matchedTokensInTitle / queryTokens.length;
  const totalCoverage = (matchedTokensInTitle + matchedTokensInDesc * 0.5) / queryTokens.length;

  // 4. Calculate True Match Percentage
  let matchPercent = 0;

  if (titleCoverage >= 1.0) {
    // 100% of query keywords appear in Title
    matchPercent = 90 + Math.min(5, Math.round((queryTokens.length / 4) * 5));
  } else if (titleCoverage >= 0.65) {
    // Major majority of keywords appear in Title
    matchPercent = Math.round(78 + titleCoverage * 12);
  } else if (titleCoverage >= 0.5) {
    // Half of keywords appear in Title
    matchPercent = Math.round(65 + titleCoverage * 15);
  } else if (totalCoverage >= 0.6) {
    // Found across title and description
    matchPercent = Math.round(60 + totalCoverage * 10);
  } else {
    // Low coverage: less than half the words match
    matchPercent = Math.round(totalCoverage * 50);
  }

  // Threshold: Only consider a form a valid match if matchPercent >= 60%
  const isMatch = matchPercent >= 60;
  const score = isMatch ? matchPercent / 10 : 0;

  return { isMatch, matchPercent, score };
}
