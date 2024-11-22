"use client";

import Link from "next/link";
import { FiDatabase, FiUsers, FiBarChart2, FiGithub } from "react-icons/fi";
import { useState, useEffect } from "react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  CopyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { message } from "antd";

export default function HomePage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("加载中...");

  useEffect(() => {
    // 从 cookie 中获取 access_token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    fetch("/api/config", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApiKey(data.apiKey))
      .catch(() => setApiKey("加载失败"));
  }, []);

  const handleCopyApiKey = () => {
    if (apiKey === "未设置") {
      message.error("API密钥未设置");
      return;
    }
    navigator.clipboard.writeText(apiKey);
    message.success("API密钥已复制到剪贴板");
  };

  const handleLogout = () => {
    // 清除所有相关的 cookie
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 清除 localStorage（以防万一）
    localStorage.removeItem("access_token");

    // 刷新页面
    window.location.href = "/token";
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* 装饰背景 - 加深背景色 */}
      <div className="absolute top-0 left-0 w-[45rem] h-[45rem] bg-gray-200/60 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[50rem] h-[50rem] bg-gray-300/50 rounded-full blur-3xl -z-10" />

      {/* 主要内容区域 */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        {/* 标题区域 */}
        <div className="w-full max-w-6xl space-y-8 mb-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-4">
              OpenWebUI Monitor
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              专为 OpenWebUI 设计的用量监控和用户余额管理平台
            </p>
          </div>

          {/* API 密钥显示组件 */}
          <div className="flex items-center justify-center">
            <div
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 
                          bg-gray-50 backdrop-blur-sm rounded-full shadow-sm border border-gray-200"
            >
              <span className="text-xs sm:text-sm text-gray-600">API密钥:</span>
              <div className="font-mono text-xs sm:text-sm text-gray-800 flex items-center gap-1 sm:gap-2">
                <span
                  className={`${apiKey === "未设置" ? "text-red-500" : ""}`}
                >
                  {showApiKey ? apiKey : "••••••••"}
                </span>
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-all duration-300"
                  disabled={apiKey === "未设置"}
                >
                  {showApiKey ? (
                    <EyeInvisibleOutlined className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeOutlined className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                <button
                  onClick={handleCopyApiKey}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-all duration-300"
                  disabled={apiKey === "未设置"}
                >
                  <CopyOutlined className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 功能卡片区域 */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Models 卡片 */}
          <Link
            href="/models"
            className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm" />
            <div className="relative p-6 h-full border border-gray-200 rounded-2xl bg-white/20">
              <div className="flex items-center mb-4">
                <div
                  className="p-3 bg-gray-900/5 rounded-xl mr-4 
                              group-hover:bg-gray-900/10 transition-all duration-300"
                >
                  <FiDatabase className="text-xl text-gray-800" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">模型管理</h2>
              </div>
              <p className="text-sm text-gray-600">
                OpenWebUI 提供模型的价格管理
              </p>
            </div>
          </Link>

          {/* Users 卡片 */}
          <Link
            href="/users"
            className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm" />
            <div className="relative p-6 h-full border border-gray-200 rounded-2xl bg-white/20">
              <div className="flex items-center mb-4">
                <div
                  className="p-3 bg-gray-900/5 rounded-xl mr-4 
                              group-hover:bg-gray-900/10 transition-all duration-300"
                >
                  <FiUsers className="text-xl text-gray-800" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">用户管理</h2>
              </div>
              <p className="text-sm text-gray-600">用户信息查询和余额管理</p>
            </div>
          </Link>

          {/* Panel 卡片 */}
          <Link
            href="/panel"
            className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm" />
            <div className="relative p-6 h-full border border-gray-200 rounded-2xl bg-white/20">
              <div className="flex items-center mb-4">
                <div
                  className="p-3 bg-gray-900/5 rounded-xl mr-4 
                              group-hover:bg-gray-900/10 transition-all duration-300"
                >
                  <FiBarChart2 className="text-xl text-gray-800" />
                </div>
                <h2 className="text-lg font-medium text-gray-900">使用统计</h2>
              </div>
              <p className="text-sm text-gray-600">使用统计数据和可视化</p>
            </div>
          </Link>
        </div>

        {/* 底部操作栏 - 改为流式布局 */}
        <div className="w-full max-w-6xl mt-12 flex justify-center">
          <div
            className="flex items-center gap-3 p-2 
                          bg-gray-50/90 backdrop-blur-md 
                          border border-gray-200 
                          rounded-full shadow-sm
                          transition-all duration-300
                          hover:bg-gray-50/95"
          >
            {/* GitHub 链接 */}
            <a
              href="https://github.com/VariantConst/OpenWebUI-Monitor"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-700
                        rounded-full
                        transition-all duration-300
                        hover:bg-white"
            >
              <FiGithub className="w-5 h-5" />
            </a>

            {/* 分隔线 */}
            <div className="w-px h-5 bg-gray-200"></div>

            {/* 退出按钮 */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2
                        text-gray-600 hover:text-gray-800
                        rounded-full
                        transition-all duration-300
                        hover:bg-white"
            >
              <LogoutOutlined className="text-base" />
              <span className="text-sm">退出</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
