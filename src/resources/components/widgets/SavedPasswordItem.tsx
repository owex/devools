import { PasswordMeter } from 'password-meter';
import classNames from 'classnames';
import React, { useRef, useEffect, useMemo, useState } from 'react';

import Button from '@/resources/components/Button';

type ScoreLevel = 'veryWeak' | 'weak' | 'medium' | 'strong' | 'veryStrong' | 'perfect';

const SavedPasswordItem = ({ text, onRemove }: { text?: string; onRemove?: () => void }) => {
    const [passwordText, setPasswordText] = useState<string>('');
    const [copyText, setCopyText] = useState<string>('Copy');
    const timerRef = useRef<number | null>(null);

    /**
     * Handles copying a password to the clipboard, and resets the copyText state back to 'Copy' after a 1 second delay.
     * 
     * @remarks
     * This function is safe to call repeatedly, as it first clears any existing timeout before setting a new one.
     * This prevents the copy text from rapidly flashing between "Copy" and "Copied!" if the user rapidly clicks the copy button.
     */
    const handleCopy = (): void => {
        setCopyText('Copied!');
        navigator.clipboard.writeText(passwordText);

        // ✅ Clear existing timeout safely
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }

        // ✅ Store timeout ID as a number
        timerRef.current = window.setTimeout(() => setCopyText('Copy'), 1000);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (text) {
            setPasswordText(text);
        };
    }, [text]);

    /**
     * Takes a string value and returns a human-readable password strength
     * label.
     *
     * @param val - The string value to convert to a friendly label.
     * @returns A string label describing the password strength.
     */
    const getFriendlyScore = (val: string): string => {
        const values: Record<ScoreLevel, string> = {
            veryWeak: 'Very Weak',
            weak: 'Weak',
            medium: 'Medium',
            strong: 'Strong',
            veryStrong: 'Very Strong',
            perfect: 'Perfect',
        };

        return values[val as ScoreLevel] || 'Unknown';
    };

    const score = useMemo<string>(() => {
        const { status } = new PasswordMeter().getResult(passwordText);

        return status;
    }, [passwordText]);

    return (
        <div className="flex items-center space-x-2">
            <button
                className="flex items-center w-full py-5 border-b border-gray-300 text-sm font-semibold text-gray-800"
                onClick={handleCopy}
            >
                <div
                    className={classNames('p-1 text-xs text-white rounded-md', {
                        'bg-purple-600': score === 'veryWeak',
                        'bg-red-600': score === 'weak',
                        'bg-orange-600': score === 'medium',
                        'bg-yellow-600': score === 'strong',
                        'bg-green-300': score === 'veryStrong',
                        'bg-green-600': score === 'perfect',
                    })}
                >
                    {getFriendlyScore(score)}
                </div>
                <div className="mx-auto">{passwordText}</div>
                <div>{copyText}</div>
            </button>
            {onRemove && (
                <div>
                    <Button onClick={onRemove}>&times;</Button>
                </div>
            )}
        </div>
    );
};

export default SavedPasswordItem;