import { LogOut, X } from "lucide-react";

interface LogoutConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
}: LogoutConfirmationModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            {/* Modal content */}
            <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
                <div className="flex items-start">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                        <LogOut className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4 text-left">
                        <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to sign out of your account?
                        </p>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-between mt-12">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Close button in the corner */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-6 h-6 hover:text-red-500" />
                </button>
            </div>
        </div>
    );
};