function getCredentials() {
  const idInstance = document.getElementById("idInstance").value.trim();
  const apiTokenInstance = document.getElementById("apiTokenInstance").value.trim();

  if (!idInstance || !apiTokenInstance) {
    showResponse("Ошибка: заполните idInstance и ApiTokenInstance");
    throw new Error("Missing credentials");
  }

  return { idInstance, apiTokenInstance };
}

function showResponse(data) {
  const responseField = document.getElementById("response");

  if (typeof data === "string") {
    responseField.value = data;
  } else {
    responseField.value = JSON.stringify(data, null, 2);
  }
}

async function callApi(method, options = {}) {
  const { idInstance, apiTokenInstance } = getCredentials();

  const url = `https://api.green-api.com/waInstance${idInstance}/${method}/${apiTokenInstance}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    showResponse(data);
  } catch (error) {
    showResponse("Ошибка запроса: " + error.message);
  }
}

function getSettings() {
  callApi("getSettings");
}

function getStateInstance() {
  callApi("getStateInstance");
}

function sendMessage() {
  const chatId = document.getElementById("chatIdMessage").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!chatId || !message) {
    showResponse("Ошибка: заполните chatId и сообщение");
    return;
  }

  callApi("sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chatId: chatId,
      message: message
    })
  });
}

function sendFileByUrl() {
  const chatId = document.getElementById("chatIdFile").value.trim();
  const urlFile = document.getElementById("fileUrl").value.trim();

  if (!chatId || !urlFile) {
    showResponse("Ошибка: заполните chatId и ссылку на файл");
    return;
  }

  callApi("sendFileByUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chatId: chatId,
      urlFile: urlFile,
      fileName: "file.jpg",
      caption: "Файл отправлен через GREEN-API"
    })
  });
}