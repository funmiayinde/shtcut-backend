'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { Pagination } from '@shtcut/_shared/namespace';
import { usePagination } from '../usePagination';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@shtcut/redux/store';
import {
    useCreateLinkMutation,
    useDeleteLinkMutation,
    useLazyDuplicateLinkQuery,
    useLazyFetchMetadataQuery,
    useLazyFindAllLinksQuery,
    useLazyGetLinkQuery,
    useUpdateLinkMutation
} from '@shtcut/services/link';
import { LinkNameSpace, MetadataResponse } from '@shtcut/_shared/namespace/link';
import { selectFindAllLinkData } from '@shtcut/redux/selectors/link';
import { debounce } from 'lodash';

interface UseLinkProps {
    id?: string;
    key?: string;
    callLinks?: boolean;
    search?: string;
    filter?: Dict;
    url?: string;
    all?: boolean;
}

interface UseLinkReturnsType {
    createLink: MutationTrigger<any>;
    deleteLink: MutationTrigger<any>;
    updateLink: MutationTrigger<any>;
    fetchMetadata: Dict;
    findAllLinks: any;
    isLoading: boolean;
    findAllLinksResponse: LinkNameSpace.Link[] | undefined;
    fetchMetaDataResponse: MetadataResponse | undefined;
    fetchMetaLoading: boolean;
    createLinkResponse: Dict;
    getLinkResponse: Dict;
    updateLinkResponse: Dict;
    duplicateLinkResponse: Dict;
    duplicate: any;
    deleteLinkResponse: Dict;
    pagination: Pagination;
    isLoadingState: boolean;
    handleCloseLoading: () => void;
    setLoadingState: (key: 'duplicating' | 'updating' | 'deleting' | 'finding' | 'creating', value: boolean) => void;
    handleSearchChange: any;
}

export const useLink = (props: UseLinkProps): UseLinkReturnsType => {
    const { callLinks = false, search, filter, id, url, all } = props;
    const { paginate, pagination } = usePagination({ key: 'findAllLinks' });
    const [createLink, createLinkResponse] = useCreateLinkMutation();
    const [updateLink, updateLinkResponse] = useUpdateLinkMutation();
    const [deleteLink, deleteLinkResponse] = useDeleteLinkMutation();
    const [findAllLinks, { isLoading, data }] = useLazyFindAllLinksQuery();
    const [duplicate, duplicateLinkResponse] = useLazyDuplicateLinkQuery();
    const [getLink, getLinkResponse] = useLazyGetLinkQuery();
    const [fetchMetadata, { data: fetchMetaDataResponse, isLoading: fetchMetaLoading, error }] =
        useLazyFetchMetadataQuery();

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const [loading, setLoading] = useState({
        duplicating: false,
        updating: false,
        deleting: false,
        finding: false,
        creating: false
    });
    const isLoadingState = Object.values(loading).some((state) => state);
    const setLoadingState = (key: keyof typeof loading, value: boolean) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };

    const handleCloseLoading = () => {
        setLoading({
            duplicating: false,
            updating: false,
            deleting: false,
            finding: false,
            creating: false
        });
    };

    const params = {
        ...paginate,
        population: JSON.stringify([
            { path: 'user' },
            { path: 'domain', select: ['slug', 'name'] },
            { path: 'qrCode' }
        ]),
        search: debouncedSearch,
        all,
        ...filter
    };

    const findAllLinksResponse = data && data?.data;
    const handleSearchChange = debounce((newSearch: string) => {
        setDebouncedSearch(newSearch);
    }, 500);

    useEffect(() => {
        if (callLinks) {
            findAllLinks({
                ...params
            });
        }
    }, [callLinks, debouncedSearch, filter]);

    useEffect(() => {
        if (id) {
            getLink({
                id,
                population: params.population
            });
        }
    }, [id]);

    useEffect(() => {
        if (url) {
            fetchMetadata({
                url
            });
        }
    }, [url]);

    return {
        isLoading,
        createLink,
        updateLink,
        deleteLink,
        findAllLinks,
        duplicate,
        findAllLinksResponse,
        createLinkResponse,
        getLinkResponse,
        updateLinkResponse,
        duplicateLinkResponse,
        deleteLinkResponse,
        pagination,
        handleCloseLoading,
        isLoadingState,
        setLoadingState,
        handleSearchChange,
        fetchMetadata,
        fetchMetaDataResponse,
        fetchMetaLoading
    };
};
