const soundFiles = {
  click: require('./sfx/FluskClick.wav'),
  win: require('./sfx/FluskWin.wav'),
  spin: require('./sfx/FluskReel.wav'),
};

class AudioManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};

  constructor(soundFiles: { [key: string]: string }) {
    for (const sound in soundFiles) {
      const audio = new Audio(soundFiles[sound]);
      console.log(audio)
      this.sounds[sound] = audio;
    }
  }

  playSound(soundName: string, loop: boolean = false) {
    if (this.sounds[soundName]) {
      const sound = this.sounds[soundName];
      sound.loop = loop;
      sound.play();
    } else {
      console.error(`Sound "${soundName}" not found!`);
    }
  }

  stopSound(soundName: string) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
      this.sounds[soundName].currentTime = 0;
    } else {
      console.error(`Sound "${soundName}" not found!`);
    }
  }

  stopAll() {
    for (const sound in this.sounds) {
      this.sounds[sound].pause();
      this.sounds[sound].currentTime = 0;
    }
  }
}

export const audioManager = new AudioManager(soundFiles);
