import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'redux/constants/constant';

import logoktx from 'assets/images/logoktx.png';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        // <Grid container spacing={gridSpacing}>
        //     <Grid item xs={12}>
        //         <Grid container spacing={gridSpacing}>
        //             <Grid item lg={4} md={6} sm={6} xs={12}>
        //                 <EarningCard isLoading={isLoading} />
        //             </Grid>
        //             <Grid item lg={4} md={6} sm={6} xs={12}>
        //                 <TotalOrderLineChartCard isLoading={isLoading} />
        //             </Grid>
        //             <Grid item lg={4} md={12} sm={12} xs={12}>
        //                 <Grid container spacing={gridSpacing}>
        //                     <Grid item sm={6} xs={12} md={6} lg={12}>
        //                         <TotalIncomeDarkCard isLoading={isLoading} />
        //                     </Grid>
        //                     <Grid item sm={6} xs={12} md={6} lg={12}>
        //                         <TotalIncomeLightCard isLoading={isLoading} />
        //                     </Grid>
        //                 </Grid>
        //             </Grid>
        //         </Grid>
        //     </Grid>
        //     <Grid item xs={12}>
        //         <Grid container spacing={gridSpacing}>
        //             <Grid item xs={12} md={8}>
        //                 <TotalGrowthBarChart isLoading={isLoading} />
        //             </Grid>
        //             <Grid item xs={12} md={4}>
        //                 <PopularCard isLoading={isLoading} />
        //             </Grid>
        //         </Grid>
        //     </Grid>
        // </Grid>
        <div sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    translate: '-50% -50%',
                    margin: 'auto',
                    width: '60vw',
                    height: '80vh'
                }}
                src={logoktx}
                alt={'Hệ thống quản lý kí túc xá'}
            />
        </div>
    );
};

export default Dashboard;
