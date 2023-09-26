export default function SiteLoader() {
    return (<>
        <div
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                zIndex: 1,
                width: "120px",
                height: "120px",
                margin: "-76px 0 0 -76px",
                border: "16px solid #f3f3f3",
                borderRadius: "50%",
                borderTop: "16px solid #3498db",
                WebkitAnimation: "spin 2s linear infinite",
                animation: "spin 2s linear infinite",
            }}
        ></div>
    </>)
}