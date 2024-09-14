export const formatDuration = (durationMs) => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return hours > 0 ? `${hours}hr ${minutes}min` : `${minutes}min ${seconds}sec`;
  };
  
  