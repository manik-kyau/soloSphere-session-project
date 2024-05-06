import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useState } from 'react';
import axios from 'axios';
// import JobCard from './JobCard';

const TabCategories = ({ job }) => {

    const [jobs, setJobs] = useState([]);

    useState(()=>{
        const getData = async()=>{
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/jobs`)
            setJobs(data)
        }
        getData();
    },[])

    return (
        <div className='container mx-auto my-12'>
            <div>
                <h2 className='text-[40px] font-bold text-center'>Browse Job by Categories</h2>
                <p className='w-3/5  mx-auto text-center'>Browse Job by Categories" is a feature commonly found on job search platforms and websites. It allows users to explore available job opportunities organized into specific categories or industries.</p>
            </div>
            <Tabs className='my-8'>
                <div className='flex items-center justify-center'>
                    <TabList>
                        <Tab>Web Development</Tab>
                        <Tab>Graphics Design</Tab>
                        <Tab>Digital Marketing</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
                        {
                            jobs.filter(j => j.category === 'Web Development').map((job, idx) => <JobCard key={idx} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
                        {
                            jobs.filter(j => j.category === 'Graphics Design').map((job, idx) => <JobCard key={idx} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
                        {
                            jobs.filter(j => j.category === 'Digital Marketing').map((job, idx) => <JobCard key={idx} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TabCategories;