import * as Localization from 'expo-localization';
import { AsyncStorage } from 'react-native'
import i18n from 'i18n-js';
// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: { timetable: 'Timetable', 
        menu: 'Menu',
        events: 'Events',
        services: 'Services',
        profile: 'Profile',
        week: 'week',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        today: 'today',
        personal_account: 'Personal account',
        buildings: 'Buildings',
        student_life: 'Student life',
        institutes: 'Institutes',
        online_catalog: 'Online catalog',
        feedback: 'Feedback',
        educational_facilities_r: 'Educational facilities (right coast)',
        educational_facilities_l: 'Educational facilities (left coast)',
        input_group_name: 'Enter the group name..',
        no_menu: 'There is no menu for today',
        settings: 'Settings',
        choose_lang: 'Select a language',
        choose_theme: 'Select a theme',
        dark_theme: 'Dark',
        light_theme: 'Light',
        default: 'Default'
        },
  ru: { timetable: 'Расписание', 
        menu: 'Меню',
        events: 'События',
        services: 'Сервисы',
        profile: 'Профиль',
        week: 'неделя',
        monday: 'Понедельник',
        tuesday: 'Вторник',
        wednesday: 'Среда',
        thursday: 'Четверг',
        friday: 'Пятница',
        saturday: 'Суббота',
        today: 'сегодня',
        personal_account: 'Личный кабинет',
        buildings: 'Корпуса',
        student_life: 'Студенческая жизнь',
        insitutes: 'Институты',
        online_catalog: 'Интернет-каталог',
        feedback: 'Обратная связь',
        educational_facilities_r: 'Учебные объекты (правый берег)',
        educational_facilities_l: 'Учебные объекты (левый берег)',
        input_group_name: 'Введите название группы..',
        no_menu: 'Меню на сегодня нет',
        settings: 'Настройки',
        choose_lang: 'Выбрать язык',
        choose_theme: 'Выбрать тему',
        dark_theme: 'Тёмная',
        light_theme: 'Светлая',
        default: 'По умолчанию'},
};
// Set the locale once at the beginning of your app.
i18n.locale = 'en';
AsyncStorage.getItem('Locale')
.then(res => {
    i18n.locale = res.split('-')[0] === 'en' ? 'en' : 'ru'
})


export default i18n