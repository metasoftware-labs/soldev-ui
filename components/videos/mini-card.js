import PropTypes from "prop-types";
import Image from "next/image";

export default function MiniCard({content}) {
    return (
        <a href={content.Url} target="_blank" rel="noreferrer">
            <div className="transition duration-200 ease-in-out transform hover:-translate-y-2">
                <Image
                    className="rounded-lg object-cover hover:opacity-85"
                    src={content.Img}
                    alt={content.Title}
                    width="360"
                    height="202"
                    quality="100"
                    placeholder="blur"
                    blurDataURL={content.Img}
                />
            </div>
            <h3 className="text-sm leading-5 text-gray-500 font-medium text-center py-1 h-12 max-w-xs">
                {content.Title}
            </h3>
        </a>
    );
}

MiniCard.propTypes = {
    content: PropTypes.object.isRequired,
};
