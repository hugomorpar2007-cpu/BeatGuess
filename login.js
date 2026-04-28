document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();

  if (username === "") {
    alert("Debes escribir un nombre para continuar");
    return;
  }

  localStorage.setItem("usuario", username);

  window.location.href = "index.html";
});
