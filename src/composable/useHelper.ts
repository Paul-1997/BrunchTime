function useHelper() {
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

export default useHelper;
