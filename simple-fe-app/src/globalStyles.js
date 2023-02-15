import GlobalStyles from '@mui/material/GlobalStyles';

export default () => {
    return (
        <GlobalStyles
            styles={{
                ul: {
                    paddingLeft: 0,
                },
                li: {
                    listStyle: 'none',
                },
                a: {
                    textDecoration: 'none',
                    color: 'white',
                },
            }}
        />
    );
};
