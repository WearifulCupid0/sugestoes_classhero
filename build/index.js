import express from "express";
const app = express();
app.use(express.json());
const pendingEmails = new Set();
app.post("/send-code", (req, res) => {
    if (!req.body || typeof req.body !== "object")
        return res.status(400).json({ error: "Invalid request body" });
    const { email } = req.body;
    if (!email || typeof email !== "string")
        return res.status(400).json({ error: "Invalid email" });
    //Daria para fazer uma verificação de identação de email aqui, por exemplo:
    // if (!email.includes("@"))
    if (pendingEmails.has(email))
        return res.status(429).json({ error: "A code has already been sent to this email" });
    //Implementação de enviar o código por email ficaria aqui
    //mailServer.sendCode(email, 123456);
    pendingEmails.add(email);
    setTimeout(() => pendingEmails.delete(email), 30 * 1000); //Remove o email da lista após 30 segundos para seguir a implementação feita no frontend
    return res.status(200).json({ message: "Code sent successfully" });
});
app.listen(8080, () => console.log("WebServer iniciado na porta 8080"));
//# sourceMappingURL=index.js.map