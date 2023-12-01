import {useEffect, useRef, useState} from "react";
import * as FileSystem from "expo-file-system";
import {audiosFilePath} from "../constants/constants";
import {Audio} from "expo-av";
import {downloadAndSaveFiles, getSourceFromImgUri} from "../utils/functions/mediaFiles";


export const useAudioPlayer = (onLoadAudio, waveFormWidth, uri, disabled) => {
    const [audioMessagePosition, setAudioMessagePosition] = useState(0)
    const [isExist, setIsExist] = useState(true)
    const [isRecordPlaying, setIsRecordPlaying] = useState(false)
    const [loading,setLoading] = useState(false)
    const soundRef = useRef(null)
    const durationRef = useRef(0)

    useEffect(() => {
        if (uri) checkIfFileExists(uri)
    }, [])


    const onSetDuration = async () => {
        const {durationMillis} = await soundRef.current.getStatusAsync();
        durationRef.current = durationMillis
    }


    const checkIfFileExists = async (filePath) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(filePath);

            if (!fileInfo.exists) {
                throw new Error(`file doesn't exist ${filePath}`);
            }
        } catch (error) {
            setIsExist(false)
            const {name} = getSourceFromImgUri(uri)
            const downloadAudioUri = `uploads/voice_messages/${name}`
            await downloadAndSaveFiles([downloadAudioUri], audiosFilePath)
        }
    }


    const onPlayStopAudioMsg = async () => {
        if (disabled) return;
        if (!isRecordPlaying) {
            if (!soundRef.current) {
                setLoading(true)
                await onLoadAudio((sound) => {
                    soundRef.current = sound
                })
            }
            setIsExist(true)
            setLoading(false)
            await onSetDuration()
            await playAudio()
        } else {
            await soundRef.current?.pauseAsync()
            setIsRecordPlaying(false)
        }
    }

    const updateAudioMessageProcess = async () => {
        try {
            let interval;
            const getStatus = async () => {
                const status = await soundRef.current.getStatusAsync()
                if (!status.isPlaying) {
                    clearInterval(interval)
                    setIsRecordPlaying(false)

                }
                if (status.positionMillis >= durationRef.current) {
                    clearInterval(interval)
                    await stopAudio()
                    setAudioMessagePosition(0)
                } else {
                    setAudioMessagePosition((status.positionMillis / durationRef.current) * 100)
                }
            }
            interval = setInterval(getStatus, 100)

        } catch
            (err) {
            console.error('update', err)
        }
    }

    const stopAudio = async () => {
        try {
            await soundRef.current?.stopAsync()
            setIsRecordPlaying(false)
        } catch (err) {
            console.error('stop', err)
        }
    }

    const playAudio = async () => {
        try {
            await Audio.setIsEnabledAsync(true);
            const status = await soundRef.current.getStatusAsync();
            await soundRef.current.setPositionAsync(audioMessagePosition * status.durationMillis / 100);
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                allowsRecordingIOS: false,
                shouldDuckAndroid: true,
            });
            await soundRef.current?.playAsync()

            setIsRecordPlaying(true)
            updateAudioMessageProcess()

        } catch (err) {
            console.error('play', err)
        }
    }

    const getDurationFormatted = (millis) => {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }

    const onPressSlider = (e) => {
        const {locationX} = e.nativeEvent
        const locPercentage = locationX / waveFormWidth * 100
        setAudioMessagePosition(locPercentage)
    }

    const onSliderValueChange = ([val]) => setAudioMessagePosition(val)

    const positionPercentage = (audioMessagePosition / durationRef.current) * 100

    const checkIsProcessed = (length, index) => {
        return length * audioMessagePosition / 100 > index
    }

    const formattedDuration = durationRef.current ? getDurationFormatted(durationRef.current) : null

    return {
        onPlayStopAudioMsg,
        checkIsProcessed,
        onPressSlider,
        onSliderValueChange,
        positionPercentage,
        audioMessagePosition,
        isRecordPlaying,
        formattedDuration,
        isExist
    }
}
