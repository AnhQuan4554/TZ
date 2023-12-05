import axios from 'axios';
import { useQuery } from 'react-query';
import { capitalizeFirstLetter } from '@tymlez/frontend-libs';
import { formatDateTimeAu } from '@tymlez/common-libs';
import type { HistoryQuery } from '@tymlez/frontend-libs';
import { useState } from 'react';

const settingBlueIcon = '../images/setting_blue.svg';
const settingGrayIcon = '../images/setting_gray.svg';
const oClockGreenIcon = '../images/oclock_green.svg';
const oClockGrayIcon = '../images/oclock_gray.svg';

const inputIcon = '../icons/timeline/mrv/input.svg';
const outputIcon = '../icons/timeline/mrv/output.svg';
const carbonIcon = '../icons/timeline/mrv/carbon.svg';

const tokenSymbolInfoMap: Record<string, any> = {
  TYM_CET: {
    image: '/trustchain/images/TYM_CET.svg',
    icon: '/trustchain/icons/carbons/tym_cet.svg',
    name: 'Carbon Emissions',
    tooltip: 'Carbon Emission',
  },
  TYM_CRU: {
    image: '/trustchain/images/TYM_CRU.svg',
    icon: '/trustchain/icons/carbons/tym_cru.svg',
    name: 'Carbon Abatement',
    tooltip: 'Carbon Reduction',
  },
  TYM_GOO: {
    image: '/trustchain/images/TYM_GOO.svg',
    icon: '/trustchain/icons/carbons/tym_goo.svg',
    name: 'Guarantee of Origin',
    tooltip: 'Guarantee of Origin',
  },
  TYM_REC: {
    image: '/trustchain/images/TYM_REC.svg',
    icon: '/trustchain/icons/carbons/tym_rec.svg',
    name: 'Renewable Energy Certificate',
    tooltip: 'Renewable Energy Certificate',
  },
};

const tokenFungibilityInfoMap: Record<string, any> = {
  FUNGIBLE_COMMON: {
    image: '/trustchain/icons/nft/fungible_common.svg',
    tooltip: 'Fungible Token',
  },
  NON_FUNGIBLE_UNIQUE: {
    image: '/trustchain/icons/nft/non_fungible_unique.svg',
    tooltip: 'Non-fungible Token',
  },
};

const tokenEntityTypeInfoMap: Record<string, any> = {
  INSTALLER: {
    icon: '/trustchain/icons/timeline/installerIcon.svg',
    subIcon: '/trustchain/icons/timeline/installerSubIcon.svg',
  },
  PROJECT: {
    icon: '/trustchain/icons/timeline/projectIcon.svg',
    subIcon: '/trustchain/icons/timeline/projectSubIcon.svg',
  },
  SITE: {
    icon: '/trustchain/icons/timeline/siteIcon.svg',
    subIcon: '/trustchain/icons/timeline/siteSubIcon.svg',
  },
};

export function useTokens(
  defaultRaAccountId: string | undefined,
  defaultTokenClassId: string | undefined,
  defaultHistoryQuery: HistoryQuery,
  defaultSortBy: 'asc' | 'desc',
) {
  const {
    isLoading: isLoadingRootAuthorityAccountIds,
    rootAuthorityAccountIds,
    selectedRaAccountId,
    setSelectedRaAccountId,
  } = useTokenRootAuthorityAccountIds(defaultRaAccountId);

  const {
    isLoading: isLoadingTokenClasses,
    tokenClasses,
    selectedTokenClassId,
    setSelectedTokenClassId,
  } = useAccountTokenClasses(defaultRaAccountId, defaultTokenClassId);

  const [historyQuery, setHistoryQuery] =
    useState<HistoryQuery>(defaultHistoryQuery);

  const [internalHistoryQuery, setInternalHistoryQuery] =
    useState<HistoryQuery>(defaultHistoryQuery);

  const [sortBy, setSortBy] = useState<'asc' | 'desc'>(defaultSortBy);

  const [allTokens, setAllTokens] = useState<any[]>([]);

  const params = {
    startDateTime: internalHistoryQuery.dateRange[0],
    endDateTime: internalHistoryQuery.dateRange[1],
    accountId: selectedRaAccountId,
    type: selectedTokenClassId,
    sortBy,
  };

  const { data, isFetching: isLoadingData } = useQuery(
    ['get-all-tokens', JSON.stringify(params)],
    async () => {
      if (selectedRaAccountId === undefined) {
        return {};
      }
      const { data: responseData } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/trustchain/token`,
        { params },
      );
      const { nextStartDate, endDate: nextEndDate } = responseData?.data || {};
      const loadedTokens = responseData?.data?.tokens?.map((item: any) => {
        // todo: make this conversion into a reuseable function
        return {
          id: item.token_id,
          name: tokenSymbolInfoMap[item.symbol].name,
          symbol: item.symbol,
          type: item.type,
          image: tokenSymbolInfoMap[item.symbol].image,
          rootAccount: item.root_authority,
          nftInfo: tokenFungibilityInfoMap[item.type],
          carbonIcon: tokenSymbolInfoMap[item.symbol].icon,
          carbonIconTooltip: tokenSymbolInfoMap[item.symbol].tooltip,
          value: item.mintedToken.amount,
          uom: item.mintedToken.metadata.valueUOM,
          mintDateTime: formatDateTimeAu(
            Number(item.consensus_timestamp) * 1000,
          ),
          transaction_id: item.transaction_id,
        };
      });
      const existingTokensTransactionIds = allTokens.map(
        (token) => token.transaction_id,
      );
      let hasNewToken = false;
      loadedTokens.forEach((token: any) => {
        if (!existingTokensTransactionIds.includes(token.transaction_id)) {
          allTokens.push(token);
          hasNewToken = true;
        }
      });

      if (hasNewToken) {
        setAllTokens(allTokens);
      }

      return { nextStartDate, nextEndDate };
    },
    { refetchOnWindowFocus: false, retry: false },
  );

  const { nextStartDate, nextEndDate } = data || {};

  const loadMoreTokens = () => {
    setInternalHistoryQuery({ dateRange: [nextStartDate, nextEndDate] });
  };

  const hasMoreTokens = Boolean(nextStartDate && nextEndDate);

  return {
    tokenClasses,
    selectedTokenClassId,
    setSelectedTokenClassId: (tokenClassId: string | undefined) => {
      setAllTokens([]);
      setSelectedTokenClassId(tokenClassId);
    },
    rootAuthorityAccountIds,
    selectedRaAccountId,
    setSelectedRaAccountId: (raAccountId: string) => {
      setAllTokens([]);
      setSelectedRaAccountId(raAccountId);
    },
    tokens: allTokens || [],
    hasMoreTokens,
    loadMoreTokens,
    isLoading:
      isLoadingRootAuthorityAccountIds ||
      isLoadingTokenClasses ||
      isLoadingData,
    historyQuery,
    setHistoryQuery: (query: HistoryQuery) => {
      setAllTokens([]);
      setHistoryQuery(query);
      setInternalHistoryQuery(query);
    },
    sortBy,
    setSortBy: (newSortBy: 'asc' | 'desc') => {
      setAllTokens([]);
      setSortBy(newSortBy);
    },
  };
}

export function useGetTokenDetails(transaction_id: any, account: any) {
  return useQuery(
    ['get-token-details', account, transaction_id],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/trustchain/v2/token/${transaction_id}?accountId=${account}`,
      );

      const token = data.data;

      const tokenTimeline: any = {
        data: [],
        mintedToken: {
          amount:
            token.mintedToken?.credentialSubject?.length > 0
              ? token.mintedToken.credentialSubject[0].amount
              : 1,
          uom: token.mintedToken.credentialSubject[0].metadata.valueUOM,
          icon: tokenSymbolInfoMap[token.symbol].image,
          name: tokenSymbolInfoMap[token.symbol].name,
        },
      };
      const transactions: any = [
        {
          data: [],
          type: 'external',
        },
      ];

      if (token.filteredTopicMessages?.length > 0) {
        token.filteredTopicMessages.map((topicMessage: any) => {
          if (topicMessage.category === 'DEVICE') {
            const filterVerifiableCredentialByDeviceName =
              token.vpDocument.verifiableCredential.find(
                (item: any) => item.deviceName === topicMessage.name,
              );
            if (
              filterVerifiableCredentialByDeviceName &&
              filterVerifiableCredentialByDeviceName.vc?.length > 0
            ) {
              const meterInstallation = {
                name: 'Meter Installation',
                time: topicMessage.date
                  ? topicMessage.date.substring(11, 16)
                  : '',
                date: topicMessage.date
                  ? topicMessage.date.substring(0, 10)
                  : '',
                input: topicMessage.input,
                position: 'right',
                misc: {
                  type: `${capitalizeFirstLetter(
                    topicMessage.misc.type.toLowerCase(),
                  )}`,
                  make: `${capitalizeFirstLetter(
                    topicMessage.misc.make.toLowerCase(),
                  )}`,
                  model: `${capitalizeFirstLetter(
                    topicMessage.misc.model.toLowerCase(),
                  )}`,
                  serialNumber: topicMessage.misc.serialNumber,
                  certification: topicMessage.misc.certification,
                  certificationExpiryDate:
                    topicMessage.misc.certificationExpiryDate,
                },
                icon: settingBlueIcon,
                subIcon: settingGrayIcon,
                color: '#2076FF',
                type: 'meter',
              };
              const readings = {
                name: capitalizeFirstLetter(topicMessage.name.toLowerCase()),
                category: capitalizeFirstLetter(
                  topicMessage.category.toLowerCase(),
                ),
                date: topicMessage.date
                  ? topicMessage.date.substring(0, 10)
                  : '',
                position: 'center',
                icon: oClockGreenIcon,
                subIcon: oClockGrayIcon,
                color: '#29AA08',
                type: 'readings',
                meterReadings: filterVerifiableCredentialByDeviceName.vc,
                mrvIconsList: {
                  input: {
                    icon: inputIcon,
                    color: '#2076FF',
                  },
                  output: {
                    icon: outputIcon,
                    color: '#29AA08',
                  },
                  carbon: {
                    icon: carbonIcon,
                    color: '#FF7020',
                  },
                },
              };
              transactions.push({
                data: [meterInstallation, readings],
                device: topicMessage.name,
                type: 'device',
              });
            }
          } else {
            const externalData = transactions.find(
              (item: any) => item.type === 'external',
            );

            let misc = {};
            switch (topicMessage.category) {
              case 'PROJECT':
                misc = {
                  type: capitalizeFirstLetter(topicMessage.misc.type),
                  standard: capitalizeFirstLetter(topicMessage.misc.standard),
                  country: capitalizeFirstLetter(topicMessage.misc.country),
                };
                break;
              case 'SITE':
                misc = {
                  location: topicMessage.misc.location,
                };
                break;

              default:
                break;
            }

            if (externalData.data.length % 2 === 0) {
              externalData.data.push({
                name: capitalizeFirstLetter(topicMessage.name.toLowerCase()),
                category: capitalizeFirstLetter(
                  topicMessage.category.toLowerCase(),
                ),
                time: topicMessage.date
                  ? topicMessage.date.substring(11, 16)
                  : '',
                date: topicMessage.date
                  ? topicMessage.date.substring(0, 10)
                  : '',
                input: topicMessage.input,
                misc,
                position: 'right',
                icon: tokenEntityTypeInfoMap[topicMessage.category].icon,
                subIcon: tokenEntityTypeInfoMap[topicMessage.category].subIcon,
                color: '#FF7020',
                type: 'external',
              });
            } else {
              externalData.data.push({
                name: capitalizeFirstLetter(topicMessage.name.toLowerCase()),
                category: capitalizeFirstLetter(
                  topicMessage.category.toLowerCase(),
                ),
                time: topicMessage.date
                  ? topicMessage.date.substring(11, 16)
                  : '',
                date: topicMessage.date
                  ? topicMessage.date.substring(0, 10)
                  : '',
                input: topicMessage.input,
                misc,
                position: 'left',
                icon: tokenEntityTypeInfoMap[topicMessage.category].icon,
                subIcon: tokenEntityTypeInfoMap[topicMessage.category].subIcon,
                color: '#FF7020',
                type: 'external',
              });
            }
          }

          return topicMessage;
        });
      }

      tokenTimeline.data = transactions;

      return {
        id: token.entityId,
        name: tokenSymbolInfoMap[token.symbol].name,
        image: tokenSymbolInfoMap[token.symbol].image,
        rootAccount: token.rootAuthority,
        nftInfo: tokenFungibilityInfoMap[token.type],
        carbonIcon: tokenSymbolInfoMap[token.symbol].icon,
        carbonIconTooltip: tokenSymbolInfoMap[token.symbol].tooltip,
        memo: token.memo,
        ledgerWorksLink: token.ledgerWorksLink,
        value:
          token.mintedToken?.credentialSubject?.length > 0
            ? token.mintedToken.credentialSubject[0].amount
            : 1,
        uom: token.mintedToken.credentialSubject[0].metadata.valueUOM,
        tokenKey: token.adminKey.key,
        mintDateTime: formatDateTimeAu(Number(token.consensusTimestamp) * 1000),
        dataHash: token.transactionHash,
        verifiablePresentation: token.vpDocument?.id ? token.vpDocument.id : '',
        tokenTimeline,
      };
    },
    { refetchOnWindowFocus: false, retry: false },
  );
}

export function useAccountTokenClasses(
  rootAuthorityAccountId: string | undefined,
  defaultTokenClassId: string | undefined,
) {
  const [selectedTokenClassId, setSelectedTokenClassId] = useState<
    string | undefined
  >(defaultTokenClassId);

  const { data: tokenClasses, isLoading } = useQuery(
    ['get-account-token-classes', rootAuthorityAccountId],
    async () => {
      if (rootAuthorityAccountId === undefined) {
        return [];
      }

      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/trustchain/accounts/${rootAuthorityAccountId}/token-classes`,
      );
      return data.data.map((item: any) => {
        return {
          tokenId: item.token_id,
          symbol: item.symbol,
        };
      });
    },
    { refetchOnWindowFocus: false, retry: false },
  );

  return {
    isLoading,
    tokenClasses,
    selectedTokenClassId,
    setSelectedTokenClassId,
  };
}

export function useTokenRootAuthorityAccountIds(
  defaultRaAccountId: string | undefined,
) {
  const [selectedRaAccountId, setSelectedRaAccountId] = useState<
    string | undefined
  >(defaultRaAccountId);

  const { isLoading, data: rootAuthorityAccountIds } = useQuery(
    ['get-accounts-from-settings'],
    async () => {
      const { data } = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/settings/trustchain/TrustchainDefaultAccount`,
      );
      if (data) {
        const result = data.value.split(',');
        return result;
      }
      return [];
    },
    { refetchOnWindowFocus: false, retry: false },
  );

  if (
    rootAuthorityAccountIds?.length > 0 &&
    selectedRaAccountId === undefined
  ) {
    setSelectedRaAccountId(rootAuthorityAccountIds[0]);
  }

  return {
    isLoading,
    rootAuthorityAccountIds,
    selectedRaAccountId,
    setSelectedRaAccountId,
  };
}
