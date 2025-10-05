import { useState } from "react";
import {
  Bell,
  CheckCircle,
  Trash,
  MagnifyingGlass,
  Clock,
  User,
  FileText,
  Warning,
} from "phosphor-react";
import { Card } from "@/components/ui";

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "bid_received",
    title: "New Bid Received",
    message: "Vendor ABC HVAC Services submitted a bid for your project #12345",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    priority: "high",
    actionUrl: "/projects/12345",
    metadata: {
      vendorName: "ABC HVAC Services",
      bidAmount: 2450,
      projectId: "12345",
    },
  },
  {
    id: "2",
    type: "project_update",
    title: "Project Status Updated",
    message:
      "Your project 'HVAC Installation' has moved to 'In Progress' status",
    timestamp: "2024-01-15T09:15:00Z",
    read: true,
    priority: "medium",
    actionUrl: "/projects/12344",
    metadata: {
      projectTitle: "HVAC Installation",
      oldStatus: "pending_review",
      newStatus: "in_progress",
    },
  },
  {
    id: "3",
    type: "document_uploaded",
    title: "Document Uploaded",
    message:
      "New document 'Installation Manual.pdf' has been uploaded to project #12345",
    timestamp: "2024-01-14T16:45:00Z",
    read: true,
    priority: "low",
    actionUrl: "/projects/12345/documents",
    metadata: {
      documentName: "Installation Manual.pdf",
      projectId: "12345",
    },
  },
  {
    id: "4",
    type: "system_alert",
    title: "System Maintenance",
    message:
      "Scheduled maintenance will occur on January 20th from 2:00 AM to 4:00 AM EST",
    timestamp: "2024-01-14T14:20:00Z",
    read: false,
    priority: "medium",
    actionUrl: null,
    metadata: {
      maintenanceDate: "2024-01-20",
      startTime: "02:00",
      endTime: "04:00",
    },
  },
  {
    id: "5",
    type: "bid_accepted",
    title: "Bid Accepted",
    message: "Your bid for project 'Commercial HVAC Repair' has been accepted",
    timestamp: "2024-01-13T11:30:00Z",
    read: true,
    priority: "high",
    actionUrl: "/vendor/projects/12346",
    metadata: {
      projectTitle: "Commercial HVAC Repair",
      bidAmount: 3200,
    },
  },
];

const notificationTypes = {
  bid_received: {
    icon: User,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  project_update: {
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  document_uploaded: {
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  system_alert: {
    icon: Warning,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  bid_accepted: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter notifications based on selected filter and search term
  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" || (filter === "unread" && !notification.read);

    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  };

  const getNotificationIcon = (type: string) => {
    const config = notificationTypes[type as keyof typeof notificationTypes];
    if (!config) return Bell;
    return config.icon;
  };

  return (
    <div className="max-w-6xl mx-auto w-full py-8 px-4 md:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your project activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Mark all as read
            </button>
          )}
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
            <Bell className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              {unreadCount} unread
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: "all", label: "All", count: notifications.length },
            { key: "unread", label: "Unread", count: unreadCount },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as "all" | "unread")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === filterOption.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
        <div className="relative flex-1 md:max-w-md">
          <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms"
                : "You're all caught up! New notifications will appear here."}
            </p>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = getNotificationIcon(notification.type);

            return (
              <Card
                key={notification.id}
                className="p-4 transition-all hover:shadow-md cursor-pointer"
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full flex-shrink-0 ${
                      notificationTypes[
                        notification.type as keyof typeof notificationTypes
                      ]?.bgColor || "bg-gray-100"
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${
                        notificationTypes[
                          notification.type as keyof typeof notificationTypes
                        ]?.color || "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {notification.actionUrl && (
                          <a
                            href={notification.actionUrl}
                            className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            View
                          </a>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notification.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
