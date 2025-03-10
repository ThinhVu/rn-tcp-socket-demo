const net = require("net");

const PORT = 5002;
const HOST = "0.0.0.0"; // Lắng nghe trên tất cả các địa chỉ mạng

const server = net.createServer((socket) => {
  console.log("Client connected:", socket.remoteAddress, socket.remotePort);

  // Nhận dữ liệu từ client
  socket.on("data", (data) => {
    console.log("Received:", data.toString());
    socket.write("Message received\n"); // Gửi phản hồi
  });

  // Xử lý khi client ngắt kết nối
  socket.on("end", () => {
    console.log("Client disconnected");
  });

  // Xử lý lỗi
  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`TCP Server is running on ${HOST}:${PORT}`);
});