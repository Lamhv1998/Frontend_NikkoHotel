# Test Login Logic

## Response từ Backend
```json
{
  "code": 0,
  "result": {
    "authenticated": false,
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJuaWtrYS5pby52biIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE3ODE2ODQ1MzIsImlhdCI6MTc1NTc2NDUzMiwic2NvcGUiOiJST0xFX0NVU1RPTUVSIn0.nlwpm1iNR-4k0Q22lNmc0i5j6sz1ceioTFnpU8fWPRsulhIZ8N8Ba8_3xPgH2L7kre0XCcD3Q-P1NkQNw2S7KA"
  }
}
```

## Logic hiện tại
- Kiểm tra `response.code === 0` (thành công)
- Kiểm tra `response.result.token` (có token)
- Nếu cả hai điều kiện đều đúng → đăng nhập thành công

## Vấn đề có thể
1. Backend trả về `code: 0` để chỉ ra thành công
2. `authenticated: false` có thể chỉ ra rằng user chưa được xác thực hoàn toàn
3. Nhưng vẫn có token để client có thể sử dụng

## Giải pháp
- Sử dụng `code === 0` và `token` để xác định thành công
- Bỏ qua field `authenticated` vì có thể không đáng tin cậy
- Tiếp tục với flow đăng nhập nếu có token
