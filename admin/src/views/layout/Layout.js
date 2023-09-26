import React from "react";
import {useEffect} from "react";
import { Card, Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import Menu from "./Menu";
import routes from "./route";
import Error404 from "../pages/errors/Error404";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import config from "../../config";
const socket = io.connect("http://localhost:3100");
const newRoutes = [];
function convertMultiToSingle(arr, prevBaseUrl = '') {
    arr.forEach(v => {
        if (v.children) {
            convertMultiToSingle(v.children, prevBaseUrl + v.url);
        } else {
            newRoutes.push({ ...v, url: prevBaseUrl + v.url })
        }
    })
}
convertMultiToSingle([...routes]);

export default function MyLayout() {

    let audioContext;

    const playSound = () => {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
  
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine'; // You can change the wave type here (sine, square, triangle, sawtooth)
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set the frequency (440 Hz = A4)
  
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
  
      gainNode.gain.setValueAtTime(1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
  
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    };
  
    useEffect(() => {
      socket.on("new-pickup-admin", (data) => {
        const notify = () => toast(data.msg);
        notify();
        playSound();
        setTimeout(() => {
          playSound();
        }, 1500);
      });
    //   return () => {
    //     socket.disconnect();
    //   };
      
    }, [socket]);

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
            <ToastContainer />
                <Layout className="site-layout">
                    <Menu />
                    <Layout.Content
                        style={{
                            margin: '24px 40px 0 40px',
                        }}
                    >
                        <Card bordered>
                            <Routes>
                                {newRoutes.filter(v => v.key !== 'logout').map((v) => <Route path={v.url} key={v.url} element={<v.component />} />)}
                                <Route path={'*'} element={<Error404 />} />
                            </Routes>
                        </Card>
                    </Layout.Content>
                </Layout>
            </Layout>
        </>
    );

}