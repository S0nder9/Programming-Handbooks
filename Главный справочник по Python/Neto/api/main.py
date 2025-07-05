from urllib.parse import urlencode
import secrets
import requests

id = "53859342"

OAUTH_BASE_URL = "https://oauth.vk.com/authorize"
params = {
    "client_id": id,
    "redirect_uri": "https://vk.com/feed",
    "display": "page",
    "scope": "status,photos",
    "response_type": "token",
    "v": "5.199",
    "state": secrets.token_hex(16)
}

oauth_url = f"{OAUTH_BASE_URL}?{urlencode(params)}"
print(oauth_url)

TOKEN = "1"

class VK_API_CLIENT:
    API_BASIC_URL = "https://api.vk.com/method"
    def __int__(self, token, user_id):
        self.token = token
        self.user_id = user_id
        
    def get_common_params(self):
        return {
            "access_token": self.token,
            "v": "5.199",
        }
        
    def get_status(self):
        params = self.get_common_params()
        params.update({"user_id": self.user_id})
        res = requests.get(f"{self.API_BASIC_URL}/status.get", params=params)
        return res.json().get("response", {}).get("text")
    
    def set_status(self, new_stats):
        params = self.get_common_params()
        params.update({"user_id": self.user_id, "text": new_stats})
        res = requests.get(f"{self.API_BASIC_URL}/status.get", params=params)
        res.raise_for_status()
        
    def replace_status(self, target, replace_string):
        status = self.get_status()
        new_status = status.replace(target, replace_string)
        self.set_status(new_status)
        
    def get_profile_photos(self):
        params = self.get_common_params()
        params.update({"owner_id": self.user_id, "album_id": "profile"})
        res = requests.get(f"{self.API_BASIC_URL}/photos.get", params=params)
        return res.json()
        
        
if __name__ == "__main__":
    vk_client = VK_API_CLIENT(TOKEN, 12345)
    # vk_client.replace_status("Hello", "Hi")
    print(vk_client.get_profile_photos())