import { PropsWithChildren } from "react";

const ClerkLayout = ({children}: PropsWithChildren) => {
   
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    );
};

export default ClerkLayout;
