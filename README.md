# Bilibili ShortLink Converter

# API

- URL
  - https://api.bilibili.com/x/share/click
- Method
  - POST
- Params

```json
{
  "build": "6180000",
  "buvid": "0",
  "oid": "https://space.bilibili.com/174865648",
  "platform": "android",
  "share_channel": "COPY",
  "share_id": "public.webview.0.0.pv",
  "share_mode": "3"
}
```

> this oid parameter is the URL that needs to be converted.

- Response

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "content": "https://b23.tv/kg14Yz8",
    "count": 0
  }
}
```
