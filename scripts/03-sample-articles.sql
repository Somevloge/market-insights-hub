-- Insert sample news articles
INSERT INTO news_articles (title, title_amharic, content, summary, category_id, source_name, source_url, is_featured, published_at) 
SELECT 
  'Bitcoin Reaches New All-Time High Amid Institutional Adoption',
  'ቢትኮይን በተቋማዊ ተቀባይነት ምክንያት አዲስ ከፍተኛ ደረጃ ደረሰ',
  'Bitcoin has surged to unprecedented levels as major financial institutions continue to embrace cryptocurrency. The digital asset crossed the $75,000 threshold for the first time, driven by increased institutional investment and growing mainstream acceptance. Major corporations and investment funds have been adding Bitcoin to their balance sheets, viewing it as a hedge against inflation and a store of value. This institutional adoption has provided significant legitimacy to the cryptocurrency market and has contributed to reduced volatility compared to previous years.',
  'Bitcoin hits record high above $75,000 as institutional investors drive adoption and market stability.',
  c.id,
  'CryptoNews Today',
  'https://example.com/bitcoin-ath',
  true,
  NOW() - INTERVAL '2 hours'
FROM categories c WHERE c.name = 'Cryptocurrency'
UNION ALL
SELECT 
  'USD/ETB Exchange Rate Shows Stability Despite Global Market Volatility',
  'የአሜሪካ ዶላር/ኢትዮጵያ ብር ምንዛሬ ተመን በአለም አቀፍ ገበያ መናወጥ ቢኖርም መረጋጋት አሳይቷል',
  'The Ethiopian Birr has maintained relative stability against the US Dollar despite ongoing global market turbulence. Financial analysts attribute this stability to recent monetary policy adjustments by the National Bank of Ethiopia and improved foreign currency reserves. The USD/ETB rate has remained within a narrow trading range over the past month, providing some relief to importers and businesses dependent on foreign currency. However, experts warn that global economic uncertainties could still impact the exchange rate in the coming months.',
  'Ethiopian Birr remains stable against USD despite global market volatility, supported by central bank policies.',
  c.id,
  'Ethiopian Financial Times',
  'https://example.com/usd-etb-stability',
  false,
  NOW() - INTERVAL '4 hours'
FROM categories c WHERE c.name = 'Forex'
UNION ALL
SELECT 
  'Gold Prices Surge as Investors Seek Safe Haven Assets',
  'የወርቅ ዋጋ ባለሀብቶች ደህንነታቸው የተጠበቀ ንብረት ሲፈልጉ ጨምሯል',
  'Gold prices have experienced a significant rally, reaching $2,100 per ounce as investors flock to safe-haven assets amid economic uncertainty. The precious metal has gained over 8% in the past two weeks, driven by concerns about inflation, geopolitical tensions, and potential recession fears. Central bank purchases have also contributed to the upward pressure on gold prices, with several emerging market central banks increasing their gold reserves. Analysts suggest that gold could continue its upward trajectory if economic uncertainties persist.',
  'Gold reaches $2,100/oz as investors seek safety amid economic uncertainty and central bank buying.',
  c.id,
  'Commodity Insights',
  'https://example.com/gold-surge',
  true,
  NOW() - INTERVAL '6 hours'
FROM categories c WHERE c.name = 'Commodities';
