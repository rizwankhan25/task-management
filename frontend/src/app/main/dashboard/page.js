'use client';

import CompletionChart from "@/components/CompletionChart";
import PriorityChart from "@/components/PriorityChart";
import UpcomingDeadlines from "@/components/UpcomingDeadlines ";
import { fetchPriorityDistribution } from "@/service/dashboardservice";
import { useEffect, useState } from "react";

const DashboardPage = () => {

    useEffect(() => {
       
    }, [])

    return (
        <div>
            <PriorityChart />
            <CompletionChart />
           <UpcomingDeadlines/>
        </div>
    )
}

export default DashboardPage;