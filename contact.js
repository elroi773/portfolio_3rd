document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
  
    if (!name || !email || !message) {
      document.getElementById("form-status").textContent = "모든 항목을 입력해주세요.";
      return;
    }
  
    // 나중에 실제 백엔드와 연동 가능
    document.getElementById("form-status").textContent = "메시지가 성공적으로 전송되었습니다!";
  
    // 폼 초기화
    this.reset();
  });
  