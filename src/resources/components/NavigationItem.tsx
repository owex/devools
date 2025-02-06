import classNames from 'classnames';
import React from 'react'
import Link from 'next/link';

type Props = {
    href: string,
    title: string,
    hasBorder?: boolean,
    theme?: 'normal' | 'bold'
}

const NavigationItem = ({
    href,
    title,
    hasBorder = true,
    theme = 'normal',
}: Props) => {

    return (
        <div>
            <div
                title="Toggle Dark Mode"
                className={classNames(
                    'flex items-center justify-center leading-none text-sm hover:text-gray-800 dark:hover:text-primary',
                    {
                        'border-l border-gray-300': hasBorder,
                        'px-5 text-white': theme === 'normal',
                        'py-2 px-2 bg-white text-primary rounded-sm': theme === 'bold',
                    }
                )}
            >
                <Link href={href} className="text-inherit">
                    {title}
                </Link>
            </div>
        </div>
    );
}

export default NavigationItem