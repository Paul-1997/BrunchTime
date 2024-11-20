/* eslint-disable no-param-reassign */
export function useHelper() {
  const alertBeforeunload = (event: BeforeUnloadEvent) => {
    event.preventDefault();

    // Included for legacy support, e.g. Chrome/Edge < 119
    event.returnValue = true;
    return true;

    // 當組件掛載時，設定事件處理程序
    // window.addEventListener('beforeunload', handleBeforeUnload);

    // 當組件卸載時，移除事件處理程序
    // this.$refs.adop.removeEventListener('beforeunload', handleBeforeUnload);
  };

  return { alertBeforeunload };
}

export function formatDate(timestamp: number, full: boolean = false): string {
  const date = new Date(timestamp * 1000); // 时间戳单位为秒，转换为毫秒

  // 获取年份、月份、日期、小时、分钟和秒
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
  const day = String(date.getDate()).padStart(2, '0'); // 确保日期是两位数
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return full ? `${year}/${month}/${day} ${hours}:${minutes}:${seconds}` : `${year}/${month}/${day}`;
}
