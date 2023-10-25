import React from 'react';

interface BackgroundProps {
    fillColor: string;
    className?: string;
}

const Background: React.FC<BackgroundProps> = ({ fillColor, className }) => {
    return (

        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="311" height="520" viewBox="0 0 290 500" fill="none">
            <path d="M13.4267 60.9384C13.1347 44.4993 25.3363 30.5087 41.6625 28.5628L236.478 5.34258C260.066 2.5311 280.532 21.5752 279.424 45.3043L260.867 442.543C259.872 463.855 241.71 480.278 220.406 479.132L56.3954 470.308C36.2613 469.225 20.3864 452.768 20.0283 432.608L13.4267 60.9384Z" fill={fillColor} />
        </svg>

    );
};

export default Background;