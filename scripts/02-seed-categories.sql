-- Insert default categories
INSERT INTO categories (name, name_amharic, description) VALUES
('Cryptocurrency', 'ክሪፕቶ ምንዛሬ', 'News and updates about cryptocurrencies, blockchain technology, and digital assets'),
('Forex', 'ፎሬክስ', 'Foreign exchange market news, currency trading insights, and market analysis'),
('Stock Market', 'የአክሲዮን ገበያ', 'Stock market updates, company earnings, and equity market analysis'),
('Commodities', 'ሸቀጦች', 'Commodity trading news, precious metals, oil, and agricultural products'),
('Economic News', 'ኢኮኖሚያዊ ዜና', 'Economic indicators, policy changes, and macroeconomic analysis'),
('Market Analysis', 'የገበያ ትንተና', 'Technical analysis, market trends, and trading strategies')
ON CONFLICT (name) DO NOTHING;
