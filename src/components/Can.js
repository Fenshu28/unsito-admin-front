import useAuth from '../hooks/useAuth';

/**
 * A component that renders its children only if the current user
 * has the required role.
 * @param {object} props
 * @param {string} props.hasRole - The role required to render the children.
 * @param {React.ReactNode} props.children - The content to render if the user has the role.
 */
const Can = ({ hasRole, children }) => {
    const { isLoading, hasRole: userHasRole } = useAuth();

    // Don't render anything while checking the token
    if (isLoading) {
        return null;
    }

    // Render children if the user has the specified role
    if (userHasRole(hasRole)) {
        return <>{children}</>;
    }

    // Otherwise, render nothing
    return null;
};

export default Can;
