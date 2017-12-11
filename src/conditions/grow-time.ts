import Condition from '../condition';

export const START_TIME = '6:00 AM';
export const END_TIME = '8:00 PM';

function timeUntilStart (date:Date) : number {
  const dateString = date.toDateString();
  const todayStart = new Date(`${dateString} ${START_TIME}`);
  return todayStart.getTime() - date.getTime();
}

function timeUntilEnd (date:Date) : number {
  const dateString = date.toDateString();
  const todayEnd = new Date(`${dateString} ${END_TIME}`);
  return todayEnd.getTime() - date.getTime();
}

function isActive () : boolean {
  const now = new Date();
  const startDelta = timeUntilStart(now);
  const endDelta = timeUntilEnd(now);

  return startDelta < 1 && 0 < endDelta;
}

function timeUntilNextChange (date:Date) {
  const startDelta = timeUntilStart(date);
  const endDelta = timeUntilEnd(date);

  if (startDelta > 0) {
    return startDelta;
  } else if (endDelta > 0) {
    return endDelta;
  } else {
    // We're done for today. Find tomorrow's start.
    const tomorrow = new Date(date.getTime());
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateString = tomorrow.toDateString();
    const tomorrowStart = new Date(`${dateString} ${START_TIME}`);
    return tomorrowStart.getTime() - date.getTime();
  }
}

export default new Condition('growTime', isActive(), (self:Condition) => {
  function triggerNextChange () {
    setTimeout(() => {
      // Apply the (then) current setting
      self.set(isActive());

      // Poke the next one
      triggerNextChange();
    }, timeUntilNextChange(new Date()));
  }

  triggerNextChange();
});
