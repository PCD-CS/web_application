import React, { lazy, Suspense } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Loader from '../components/UI/Loader';

const Render = lazy(() => import('../components/Render'));
const Login = lazy(() => import('../components/Admin/forms/Login'));

const UploadMasterSheet = lazy(() => import('../components/Admin/NewCompany/CompanyList/DropPaymentConfig/GeneratePayslips/UploadMasterSheet'));
const NoPage = lazy(() => import('../components/NoPage'));

const Routing = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path='/' element={<Outlet />} >
                    <Route index element={<Render />} />
                </Route>

                <Route path='/auth' element={<Outlet />} >
                    <Route path='login' element={<Login />} />
                </Route>

                <Route path='/payslip' element={<Outlet />}>
                    <Route path='employee' element={<UploadMasterSheet />} />
                </Route>

                <Route path="*" element={<NoPage />} />
            </Routes>
        </Suspense>
    );
};

export default Routing;