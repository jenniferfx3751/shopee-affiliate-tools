# SizukaShop AI v4.1

Upload file ini ke project Next.js kamu.

## Taruh file:
`app/api/chat/route.js`

## Tambahkan Environment Variables di Vercel:
- OPENAI_API_KEY=isi_api_key_kamu
- OPENAI_BASE_URL=https://api.openai.com/v1 (atau Koboi endpoint kamu)
- OPENAI_MODEL=gpt-4o-mini

## Frontend fetch:
POST ke `/api/chat`
Body:
{ "message": "Halo" }

Response:
{ "reply": "Halo! Ada yang bisa saya bantu?" }
