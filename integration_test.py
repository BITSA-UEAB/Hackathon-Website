#!/usr/bin/env python3
"""
Frontend-Backend Integration Test
Tests the exact data flow that the React frontend sends to Django backend
"""
import requests
import json

def test_frontend_registration():
    """Test the exact registration flow from React frontend"""
    
    print("=== Frontend-Backend Registration Test ===\n")
    
    # Test 1: Check if frontend can reach backend
    print("1. Testing Backend Connectivity...")
    try:
        response = requests.get("http://localhost:8000/api/auth/stats/")
        print(f"   ✅ Backend Status: {response.status_code}")
        print(f"   ✅ Response: {response.json()}")
    except Exception as e:
        print(f"   ❌ Backend connection failed: {e}")
        return False
    
    # Test 2: Simulate exact frontend registration call
    print("\n2. Testing Registration Endpoint (Simulating Frontend)...")
    
    # This matches exactly what AuthContext.tsx sends
    test_data = {
        "username": "frontendtest@example.com",
        "email": "frontendtest@example.com", 
        "password": "TestPassword123",
        "password_confirm": "TestPassword123",
        "first_name": "Frontend",
        "last_name": "Test"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/auth/register/",
            json=test_data,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"   📡 Request URL: {response.request.url}")
        print(f"   📤 Request Headers: {dict(response.request.headers)}")
        print(f"   📦 Request Body: {response.request.body}")
        print(f"   📥 Response Status: {response.status_code}")
        print(f"   📥 Response Headers: {dict(response.headers)}")
        print(f"   📥 Response Body: {response.text}")
        
        if response.status_code == 201:
            print("   ✅ Registration successful!")
            data = response.json()
            print(f"   🎯 User ID: {data['user']['id']}")
            print(f"   🎯 Email: {data['user']['email']}")
            print(f"   🎯 Name: {data['user']['name']}")
            print(f"   🎯 Tokens: access + refresh provided")
            return True
        else:
            print(f"   ❌ Registration failed with status {response.status_code}")
            try:
                error_data = response.json()
                print(f"   📋 Error details: {json.dumps(error_data, indent=6)}")
            except:
                print(f"   📋 Raw error response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("   ❌ Could not connect to backend")
        return False
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

    # Test 3: Test CORS headers
    print("\n3. Testing CORS Configuration...")
    try:
        response = requests.options("http://localhost:8000/api/auth/register/")
        cors_headers = {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
        }
        print(f"   📋 CORS Headers: {cors_headers}")
        
        if 'http://localhost:5173' in str(cors_headers.get('Access-Control-Allow-Origin', '')):
            print("   ✅ CORS configured for React frontend")
        else:
            print("   ⚠️  CORS may not be configured for React frontend")
            
    except Exception as e:
        print(f"   ❌ CORS test failed: {e}")

if __name__ == "__main__":
    test_frontend_registration()

