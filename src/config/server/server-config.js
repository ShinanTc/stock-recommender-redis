// for starting the server
export function startServer(app) {

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}