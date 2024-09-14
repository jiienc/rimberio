import Choices1 from './Choices1.jsx';
import Choices2 from './Choices2.jsx';
import Choices3 from './Choices3.jsx';
import Choices4 from './Choices4.jsx';
import Choices0 from './Choices0.jsx';
import Navigation from './Navigation.jsx'

const DisplayHome = () => {
    return (
        <>
            <Navigation />
            <Choices0 />
            <Choices1 />
            <Choices2 />
            <Choices3 />
            <Choices4 />
        </>
    );
};

export default DisplayHome;