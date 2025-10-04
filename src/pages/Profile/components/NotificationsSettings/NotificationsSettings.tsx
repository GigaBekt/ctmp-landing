import { Card } from "@/components/ui";
import { Bell } from "phosphor-react";
import type { NotificationSettings } from "@/stores/useUserStore";

interface NotificationsSettingsProps {
  notifications: NotificationSettings;
  onNotificationChange: (key: keyof NotificationSettings) => void;
}

const NotificationToggle = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
    <div className="flex-1">
      <h4 className="text-sm font-medium text-gray-900">{label}</h4>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-[#2c74b3]" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

const NotificationsSettings = ({
  notifications,
  onNotificationChange,
}: NotificationsSettingsProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <NotificationToggle
            label="Email Notifications"
            description="Receive notifications via email"
            checked={notifications.emailNotifications}
            onChange={() => onNotificationChange("emailNotifications")}
          />
          <NotificationToggle
            label="SMS Notifications"
            description="Receive notifications via text message"
            checked={notifications.smsNotifications}
            onChange={() => onNotificationChange("smsNotifications")}
          />
          <NotificationToggle
            label="Project Updates"
            description="Get notified about project status changes"
            checked={notifications.projectUpdates}
            onChange={() => onNotificationChange("projectUpdates")}
          />
          <NotificationToggle
            label="Bid Notifications"
            description="Receive alerts about new bids and bid updates"
            checked={notifications.bidNotifications}
            onChange={() => onNotificationChange("bidNotifications")}
          />
          <NotificationToggle
            label="Marketing Emails"
            description="Receive promotional and marketing communications"
            checked={notifications.marketingEmails}
            onChange={() => onNotificationChange("marketingEmails")}
          />
          <NotificationToggle
            label="Security Alerts"
            description="Get notified about security-related activities"
            checked={notifications.securityAlerts}
            onChange={() => onNotificationChange("securityAlerts")}
          />
        </div>
      </Card>

      {/* Communication Preferences */}
      <Card className="p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Communication Preferences
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">
                  Instant Notifications
                </h4>
                <p className="text-xs text-blue-700 mt-1">
                  Get real-time alerts for urgent project updates and customer
                  messages
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Preferred Contact Method
              </h4>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-1 focus:ring-[#2c74b3] text-sm">
                <option>Email</option>
                <option>Phone</option>
                <option>SMS</option>
                <option>In-app only</option>
              </select>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Notification Frequency
              </h4>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#2c74b3] focus:ring-1 focus:ring-[#2c74b3] text-sm">
                <option>Immediate</option>
                <option>Daily digest</option>
                <option>Weekly summary</option>
                <option>Monthly summary</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotificationsSettings;
