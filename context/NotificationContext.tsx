"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { TTCNotification, INITIAL_NOTIFICATIONS, NotificationCategory, NotificationTarget } from "@/lib/notifications";

interface SendNotificationParams {
  title: string;
  message: string;
  category: NotificationCategory;
  target: NotificationTarget;
  pinned?: boolean;
  translations?: {
    kn?: { title: string; message: string };
    hi?: { title: string; message: string };
  };
}

interface NotificationContextType {
  notifications: TTCNotification[];
  allNotifications: TTCNotification[];
  unreadCount: number;
  sendNotification: (params: SendNotificationParams) => boolean;
  deleteNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  isRead: (id: string) => boolean;
  currentRole: string;
  setCurrentUser: (role: string, email: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY = "ttc_notifications_store_v2";
const READ_STORAGE_KEY_PREFIX = "ttc_read_notifs_";

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allList, setAllList] = useState<TTCNotification[]>(INITIAL_NOTIFICATIONS);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [currentRole, setRole] = useState<string>("student");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("student@talent.demo");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllList(parsed);
        } else {
          setAllList(INITIAL_NOTIFICATIONS);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
        }
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
      }

      // Check current session
      const sessionStr = localStorage.getItem("ttc_session");
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session.role) setRole(session.role);
        if (session.email) setCurrentUserEmail(session.email);
      }
    } catch {
      // fallback
    }
    setIsLoaded(true);
  }, []);

  // Load read notifications for user
  useEffect(() => {
    if (!currentUserEmail) return;
    try {
      const readKey = `${READ_STORAGE_KEY_PREFIX}${currentUserEmail}`;
      const savedRead = localStorage.getItem(readKey);
      if (savedRead) {
        setReadIds(JSON.parse(savedRead));
      } else {
        setReadIds([]);
      }
    } catch {
      // fallback
    }
  }, [currentUserEmail, currentRole]);

  const setCurrentUser = useCallback((role: string, email: string) => {
    setRole(role);
    setCurrentUserEmail(email);
  }, []);

  const saveNotificationsToStorage = (newList: TTCNotification[]) => {
    setAllList(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch {
      // fallback
    }
  };

  const isAccessible = useCallback((notif: TTCNotification, role: string) => {
    if (role === "admin") return true;
    if (notif.target === "all") return true;
    if (role === "student" && notif.target === "students") return true;
    if (role === "teacher" && notif.target === "teachers") return true;
    return false;
  }, []);

  // Filtered notifications for the active role
  const notifications = allList.filter((notif) => isAccessible(notif, currentRole));

  const isRead = useCallback((id: string) => {
    return readIds.includes(id);
  }, [readIds]);

  const unreadCount = notifications.filter((notif) => !readIds.includes(notif.id)).length;

  const sendNotification = (params: SendNotificationParams): boolean => {
    const newNotif: TTCNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: params.title.trim(),
      message: params.message.trim(),
      category: params.category,
      target: params.target,
      author: "Center Admin",
      createdAt: new Date().toISOString(),
      pinned: params.pinned || false,
      translations: params.translations,
    };

    const updated = [newNotif, ...allList];
    saveNotificationsToStorage(updated);
    return true;
  };

  const deleteNotification = (id: string) => {
    const updated = allList.filter((n) => n.id !== id);
    saveNotificationsToStorage(updated);
  };

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      try {
        localStorage.setItem(`${READ_STORAGE_KEY_PREFIX}${currentUserEmail}`, JSON.stringify(updated));
      } catch {
        // fallback
      }
    }
  };

  const markAllAsRead = () => {
    const allVisibleIds = notifications.map((n) => n.id);
    const combined = Array.from(new Set([...readIds, ...allVisibleIds]));
    setReadIds(combined);
    try {
      localStorage.setItem(`${READ_STORAGE_KEY_PREFIX}${currentUserEmail}`, JSON.stringify(combined));
    } catch {
      // fallback
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        allNotifications: allList,
        unreadCount,
        sendNotification,
        deleteNotification,
        markAsRead,
        markAllAsRead,
        isRead,
        currentRole,
        setCurrentUser,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
