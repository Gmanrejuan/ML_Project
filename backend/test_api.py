#!/usr/bin/env python3
import requests
import json
import os
def test_api():
    url = os.getenv("FRONTEND_URL")
    # Test normal text
    test_data = {"input": "This is a normal message"}
    try:
        response = requests.post(url, json=test_data)
        print(f"Normal text test - Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print()
    except Exception as e:
        print(f"Error testing normal text: {e}")
    
    # Test potential hate speech
    test_data = {"input": "I hate stupid people they are worthless"}
    try:
        response = requests.post(url, json=test_data)
        print(f"Hate speech test - Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print()
    except Exception as e:
        print(f"Error testing hate speech: {e}")

if __name__ == "__main__":
    test_api()
