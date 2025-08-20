-- Add role column to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'standard' CHECK (role IN ('admin', 'standard'));

-- Create an admin user (you can update this with a real admin email)
-- This is just for testing - in production, you'd create admin users through a secure process
UPDATE user_profiles 
SET role = 'admin' 
WHERE id IN (
  SELECT id FROM auth.users 
  WHERE email = 'admin@marketinsights.com'
);
