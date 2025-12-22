#!/usr/bin/env python3
"""
Focused test to identify registration endpoint issues
"""
import requests
import json

def test_registration_detailed():
    """Test registration with detailed error reporting"""
    url = "http://localhost:8000/api/auth/register/"
    
    # Test data that matches frontend structure
    test_data = {
        "username": "newtest@example.com",
        "email": "newtest@example.com",
        "password": "SecurePass123",
        "password_confirm": "SecurePass123",
        "first_name": "New",
        "last_name": "Test"
    }
    
    try:
        print("Testing registration endpoint...")
        print(f"URL: {url}")
        print(f"Data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(url, json=test_data)
        
        print(f"\nResponse Status: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 201:
            print("✅ Registration successful!")
            return True
        elif response.status_code == 400:
            print("❌ Registration failed with validation errors")
            try:
                error_data = response.json()
                print("Validation errors:", json.dumps(error_data, indent=2))
            except:
                print("Could not parse error response")
            return False
        else:
            print(f"❌ Registration failed with status {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the Django server. Make sure it's running on port 8000.")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    test_registration_detailed()

