import errorImage from "../assets/error-image.svg";

const SmallScreenError = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-screen min-w-screen bg-custom-gradient">
            <img
                src={errorImage}
                alt="404 Error"
                className="w-40 h-40 sm:w-56 sm:h-56"
            />
            <p className="mt-4 text-white text-lg p-5 sm:text-xl font-semibold">
                Please use a larger screen to access the admin panel
            </p>
        </div>
    );
};

export default SmallScreenError;