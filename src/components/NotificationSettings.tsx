import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Check } from 'lucide-react';
import { requestNotificationPermission, scheduleDailyReminder } from '../lib/notifications';

const NotificationSettings = () => {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [enabled, setEnabled] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if ('Notification' in window) setPermission(Notification.permission);
        setEnabled(localStorage.getItem('notifications_enabled') === 'true');
    }, []);

    const toggle = async () => {
        if (!enabled) {
            const granted = await requestNotificationPermission();
            if (granted) {
                setPermission('granted');
                setEnabled(true);
                localStorage.setItem('notifications_enabled', 'true');
                scheduleDailyReminder(9);
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            }
        } else {
            setEnabled(false);
            localStorage.setItem('notifications_enabled', 'false');
        }
    };

    if (!('Notification' in window)) return null;

    return (
        <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${enabled ? 'bg-emerald-100' : 'bg-stone-200'}`}>
                {enabled ? <Bell size={15} className="text-emerald-600" /> : <BellOff size={15} className="text-stone-400" />}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-stone-700">Daily reminders</p>
                <p className="text-[10px] text-stone-400">{enabled ? 'You\'ll be reminded at 9am daily' : 'Get reminded to practice daily'}</p>
            </div>
            <button onClick={toggle}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${enabled ? 'bg-stone-200 text-stone-600 hover:bg-stone-300' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}>
                {saved ? <><Check size={12} /> Enabled!</> : enabled ? 'Disable' : 'Enable'}
            </button>
        </div>
    );
};

export default NotificationSettings;
