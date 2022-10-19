export function notify(title, body, clickCallback) {

    if (Notification.permission === 'granted') {
        console.log('用户允许通知');
    } else if (Notification.permission === 'denied') {
        console.log('用户拒绝通知');
    } else {
        console.log('用户还没选择，去向用户申请权限吧');
    }
    new Notification(title, { 
        body: body, 
        icon: 'https://img-blog.csdnimg.cn/5a2df62e087d4a9c8898a81d845d5ec8.png'
     })
        .onclick = () => clickCallback()
}