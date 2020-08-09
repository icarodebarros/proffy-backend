export default function convertHourToMinutes(time: string) {
    // input = "8:00", output = 480
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes;
    
    return timeInMinutes;
}