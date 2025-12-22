#!/usr/bin/env python3
import requests
import json

def test_registration():
    """Test the registration API endpoint"""
    
    # API endpoint
    url = "http://localhost:8000/api/auth/register/"
    
    # Test data
    test_data = {
        "username": "test@example.com",
        "email": "test@example.com",
        "password": "TestPassword123",
        "password_confirm": "TestPassword123",
        "first_name": "Test",
        "last_name": "User"
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
        else:
            print("❌ Registration failed!")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the Django server. Make sure it's running on port 8000.")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_backend_connection():
    """Test basic connection to Django backend"""
    try:
        response = requests.get("http://localhost:8000/api/auth/stats/")
        print(f"Backend connection test - Status: {response.status_code}")
        print(f"Response: {response.text}")
        return True
    except Exception as e:
        print(f"Backend connection failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("=== Testing Django Backend Connection ===")
    test_backend_connection()
    
    print("\n=== Testing Registration Endpoint ===")
    test_registration()
