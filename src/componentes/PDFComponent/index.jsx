/** @format */

import {
    Document,
    Page,
    Text,
    View,
    Image,
    PDFViewer,
    Font,
    Svg,
    Path,
} from '@react-pdf/renderer';

import logo from '../../assets/pdf/reduzzi_logo_pdf.png';

import { stringReducer } from '../../utils/stringReducer.js';

import arrowGray from '../../assets/pdf/arrow_gray_pdf.png';

import { tw } from './tailwindConfig.js';
import { useGetUserContext } from '../../hooks/useGetUserContext.jsx';
import { useEffect } from 'react';

Font.register({
    family: 'axiforma',
    src: 'https://fonts.gstatic.com/s/axiforma/v10/1Ptsg8LJRfWJmhDAuUsw0L5OcCk.ttf',
});

const CrossElement = () => (
    <div
        style={tw(
            'w-[20px]  h-[20px]  rounded-full mb-[45px]  bg-[#063958ff] items-center justify-center relative',
        )}
    >
        <div style={tw('w-[2px] h-[10px] bg-white absolute')}></div>
        <div style={tw('w-[2px] h-[10px] bg-white rotate-90 absolute')}></div>
    </div>
);

const EqualElement = () => (
    <div
        style={tw(
            'w-[20px]  h-[20px]  rounded-full mb-[45px]  bg-[#063958ff] items-center justify-center relative',
        )}
    >
        <div
            style={tw(
                'w-[2px] h-[10px] top-[3px]  rotate-90 bg-white absolute',
            )}
        ></div>
        <div
            style={tw(
                'w-[2px] h-[10px] bg-white bottom-[3px]  rotate-90 absolute',
            )}
        ></div>
    </div>
);

const ValoresGerais = ({ label, value, valueStyle, divStyle }) => (
    <div style={tw('flex flex-col items-start')}>
        <Text style={tw('text-[10px]')}>{label}</Text>
        <div
            style={
                divStyle ||
                tw(
                    'flex justify-center h-[30px] px-2 border-[1px] border-gray-400 w-[100%] rounded-[3px] items-center text-start pt-2',
                )
            }
        >
            <Text style={valueStyle}>{value}</Text>
        </div>
    </div>
);

export const PDFComponent = () => {
    const data = JSON.parse(localStorage.getItem('obraData'));

    const { userContext, getUserContext } = useGetUserContext();

    console.log('userContext PDF', userContext);

    useEffect(() => {
        const callback = async () => {
            getUserContext();
        };

        callback();
    }, []);

    console.log('userContext', userContext);

    return (
        <PDFViewer
            style={{ width: window.innerWidth, height: window.innerHeight }}
        >
            <Document title="Orçamento" author="Reduzzi">
                <Page size="A4">
                    <View
                        style={tw(
                            'h-[8rem] p-6 flex flex-row justify-between items-center bg-gray-500 bg-[#00395e]',
                        )}
                    >
                        <Image src={logo} style={tw('w-[140px] h-[45px]')} />
                        <div
                            style={tw(
                                'text-white flex flex-row items-center gap-2',
                            )}
                        >
                            <Svg
                                viewBox="0 0 5.9333191 7.3599852"
                                style={tw('w-[18px] h-[18px]')}
                            >
                                <Path
                                    d="M 0.000 0.000 L 5.933 3.680 L 0.000 7.360 L 0.000 0.000 Z"
                                    fill="gray"
                                />
                            </Svg>
                            <Text style={tw('text-[24px] text-extrabold')}>
                                ORÇAMENTO
                            </Text>
                        </div>
                    </View>

                    <View
                        style={tw(
                            'bg-white h-[720px] flex flex-col items-center gap-8 text-white',
                        )}
                    >
                        <div
                            style={tw(
                                'flex flex-row justify-center items-center mt-4 gap-2',
                            )}
                        >
                            <Image
                                src={arrowGray}
                                style={tw('w-[10px] h-[10px]')}
                            />
                            <Text style={tw('text-[1rem] text-[#00395e] mt-0')}>
                                DADOS DO ORÇAMENTO DE PRESTAÇÃO DE SERVIÇOS:
                                REDUÇÃO DE INSS
                            </Text>
                        </div>

                        <div
                            style={tw(
                                'flex flex-row flex-wrap  py-2 items-center justify-center gap-y-6 gap-x-8 text-sm text-gray-600 bg-[#EEF1F6] h-[125px]',
                            )}
                        >
                            <ValoresGerais
                                label="M² de Construção"
                                value={`${data?.m2Construcao} m²`}
                            />

                            <ValoresGerais
                                label="Complementar"
                                value={`${data?.m2PiscinaQuadra} m²`}
                            />
                            <ValoresGerais
                                label="RMT gerada"
                                value={`R$ ${data?.rmtObra}`}
                            />
                            <ValoresGerais
                                label="Tabela VAU"
                                value={`${data?.valorVau}`}
                            />

                            <ValoresGerais
                                label="UF"
                                value={`${data?.ufObra.value}`}
                            />

                            <ValoresGerais
                                label="Cidade"
                                value={`${data?.cidadeObra.value}`}
                            />

                            <ValoresGerais
                                label="Trabalhadores"
                                value={`${data?.quantTrabalhadores}`}
                            />

                            <ValoresGerais
                                label="Nome do Cliente"
                                value={`${stringReducer(data?.proprietario)}`}
                                divStyle={tw(
                                    'flex justify-center h-[30px] px-2 border-[1px] border-gray-400 w-[100%] rounded-[3px] items-center text-start pt-2',
                                )}
                            />
                            <ValoresGerais label="CPF" value={`${data?.cpf}`} />
                            <ValoresGerais
                                label="Data de Término"
                                value={`${data?.previsaoTermino}`}
                            />

                            {!data?.terminoMenorOuIgualQueAtual && (
                                <ValoresGerais
                                    label="Meses a Lançar Sem Multa"
                                    value={`${data?.mesesALancar}`}
                                    divStyle={tw(
                                        'px-2 border-[1px] h-[30px] w-[75px] ml-8 border-gray-400 rounded-[3px]  text-base items-center text-sm pt-2',
                                    )}
                                />
                            )}
                        </div>

                        <div
                            style={tw(
                                'flex flex-row justify-center text-gray-600 gap-x-24',
                            )}
                        >
                            <div
                                style={tw(
                                    'flex flex-row text-sm items-end relative',
                                )}
                            >
                                <Text
                                    style={tw(
                                        'text-lg absolute left-[-20px] bottom-[15px]',
                                    )}
                                >
                                    De
                                </Text>

                                <div style={tw('flex flex-col')}>
                                    <Text
                                        style={tw(
                                            'text-gray-600 font-bold  text-base mb-[2px]',
                                        )}
                                    >
                                        Na regra antiga
                                    </Text>

                                    <div
                                        style={tw(
                                            'border-[1px] border-gray-600 rounded-[5px] h-[40px] w-[125px] items-center justify-center',
                                        )}
                                    >
                                        <Text
                                            style={tw('text-xl mt-2')}
                                        >{`${Math.round(Number(data?.totalImpostoSemReducao)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                                    </div>
                                </div>
                            </div>

                            <div
                                style={tw(
                                    'flex flex-row text-sm items-end relative',
                                )}
                            >
                                <Text
                                    style={tw(
                                        'text-lg absolute left-[-25px] bottom-[15px]',
                                    )}
                                >
                                    Por
                                </Text>

                                <div style={tw('flex flex-col')}>
                                    <Text
                                        style={tw(
                                            'text-gray-600 text-base text-[#006837]',
                                        )}
                                    >
                                        Na regra atual
                                    </Text>

                                    <div
                                        style={tw(
                                            'border-[1px] border-gray-600 rounded-[5px] h-[40px] w-[125px] items-center justify-center',
                                        )}
                                    >
                                        <Text
                                            style={tw(
                                                'text-xl mt-2 text-[#063958]',
                                            )}
                                        >{`${Math.round(Number(data?.regraAtual)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            style={tw(
                                'bg-[#006837ff] flex flex-row justify-between rounded-lg md:overflow-hidden flex-wrap lg:flex-nowrap',
                            )}
                        >
                            <div
                                style={tw(
                                    'flex md:items-center justify-between w-full lg:w-[340px] py-6 px-8 flex-col md:flex-row gap-7',
                                )}
                            >
                                <div>
                                    <Text
                                        style={tw(
                                            'border-l-[5px] border-green-400 font-axiforma text-white font-extrabold text-[14px] w-[80px] pl-3',
                                        )}
                                    >
                                        ECONOMIA GERADA:
                                    </Text>
                                </div>
                                <Text
                                    style={tw(
                                        'text-white font-extrabold text-[20px] sm:text-[30px]',
                                    )}
                                >
                                    {`${Number(
                                        data?.totalImpostoSemReducao -
                                            data?.regraAtual,
                                    ).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}`}
                                </Text>
                            </div>

                            <div
                                style={tw(
                                    'bg-[#063958ff] text-center py-3 px-10 w-full lg:max-w-[250px]',
                                )}
                            >
                                <Text
                                    style={tw(
                                        'text-white font-extrabold text-[20px]',
                                    )}
                                >
                                    {`${(
                                        100 -
                                        (Number(data?.regraAtual) /
                                            data?.totalImpostoSemReducao) *
                                            100
                                    ).toFixed(0)}% DE REDUÇÃO`}
                                </Text>
                                <Text
                                    style={tw(
                                        'text-white font-bold text-[8px] text-center',
                                    )}
                                >
                                    BASE LEGAL ATUAL DA RECEITA FEDERAL
                                </Text>
                                <Text
                                    style={tw(
                                        'text-white font-bold text-[8px] text-center',
                                    )}
                                >
                                    CONFORME IN. 2021/2021
                                </Text>
                            </div>
                        </div>

                        <div style={tw('flex px-2 w-full')}>
                            <div
                                style={tw(
                                    'flex flex-row justify-center w-[100%] z-0 h-[150px] border-gray-600 rounded-[5px] px-6  border-[1px] relative',
                                )}
                            >
                                <div
                                    style={tw(
                                        'flex flex-row w-[45%] justify-center items-center border-gray-600 border-[1px] bg-white absolute right-[30%] z-30 top-[-12px] h-[25px] rounded-[5px] px-2',
                                    )}
                                >
                                    <Image
                                        src={arrowGray}
                                        style={tw('w-[10px] h-[10px] mr-2')}
                                    />
                                    <Text
                                        style={tw(
                                            'text-xs text-[#00395e] mt-0',
                                        )}
                                    >
                                        FORMA DE PAGAMENTO DOS IMPOSTOS
                                    </Text>
                                </div>

                                <div
                                    style={tw(
                                        'flex flex-row items-center justify-between mt-[24px] gap-x-2',
                                    )}
                                >
                                    {!data?.terminoMenorOuIgualQueAtual && (
                                        <div
                                            style={tw(
                                                (data?.valorMesRetroativo ===
                                                    0 &&
                                                    'flex flex-col items-start mb-[5rem] pb-[2px]') ||
                                                    'flex flex-col items-start',
                                            )}
                                        >
                                            <Text
                                                style={tw(
                                                    'text-gray-600 text-base',
                                                )}
                                            >
                                                Entrada
                                            </Text>
                                            <div
                                                style={tw(
                                                    'bg-[#EEF1F6] h-[25px] rounded-[5px] px-2 flex flex-row items-center justify-center text-sm gap-x-2 ',
                                                )}
                                            >
                                                <Image
                                                    src={arrowGray}
                                                    style={tw(
                                                        'w-[10px] h-[10px]',
                                                    )}
                                                />
                                                <Text
                                                    style={tw(
                                                        'text-sm text-[#00385e] font-bold',
                                                    )}
                                                >{`${data?.valorMesRetroativo.toLocaleString(
                                                    'pt-BR',
                                                    {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    },
                                                )}`}</Text>
                                            </div>

                                            {data?.valorMesRetroativo > 0 && (
                                                <>
                                                    <Text
                                                        style={tw(
                                                            'text-gray-600 text-[6px] mt-[2px] font-bold',
                                                        )}
                                                    >
                                                        NA ENTRADA ESSES
                                                    </Text>
                                                    <div
                                                        style={tw(
                                                            'flex flex-row items-center',
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                'text-sm text-[#00385e] font-bold',
                                                            )}
                                                        >
                                                            {!data?.terminoMenorOuIgualQueAtual
                                                                ? `${Math.round(Number(data?.valorMesRetroativo)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
                                                                : Math.round(
                                                                      data?.regraAtual,
                                                                  ).toLocaleString(
                                                                      'pt-BR',
                                                                      {
                                                                          style: 'currency',
                                                                          currency:
                                                                              'BRL',
                                                                      },
                                                                  )}
                                                        </Text>

                                                        <Text
                                                            style={tw(
                                                                'text-gray-600 ml-[2px] text-[6px] mt-[2px] font-bold',
                                                            )}
                                                        >
                                                            PODERÃO SER PAGOS
                                                        </Text>
                                                    </div>

                                                    <Text
                                                        style={tw(
                                                            'text-gray-600 ml-[2px] text-[6px] mt-[2px] font-bold',
                                                        )}
                                                    >
                                                        À VISTA OU PARCELADOS EM
                                                        ATÉ
                                                    </Text>

                                                    <div
                                                        style={tw(
                                                            'flex flex-row items-center border-b-[1px] border-gray-600',
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                'text-[#063958ff] font-bold',
                                                            )}
                                                        >{`${data?.valorFinalDaEntradaParcelamento}`}</Text>
                                                        <Text
                                                            style={tw(
                                                                'text-sm font-bold text-gray-600 mt-[6px]  font-bold',
                                                            )}
                                                        >
                                                            X
                                                        </Text>
                                                        <Text
                                                            style={tw(
                                                                'text-[#063958ff] font-bold ml-[4px]',
                                                            )}
                                                        >{`${data?.valorDaEntradaParcelamentoTotal?.toLocaleString(
                                                            'pt-BR',
                                                            {
                                                                style: 'currency',
                                                                currency: 'BRL',
                                                            },
                                                        )}`}</Text>
                                                    </div>

                                                    <Text
                                                        style={tw(
                                                            'text-gray-600 ml-[2px] text-[6px] mt-[6px] font-bold',
                                                        )}
                                                    >
                                                        NO DÉBITO AUTOMÁTICO
                                                    </Text>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {!data?.terminoMenorOuIgualQueAtual && (
                                        <>
                                            <CrossElement />

                                            <div
                                                style={tw(
                                                    'flex flex-col mt-[22px]  items-center justify-between',
                                                )}
                                            >
                                                <div
                                                    style={tw(
                                                        'flex flex-row mb-[4px]  justify-between mr-[16px]',
                                                    )}
                                                >
                                                    <Text
                                                        style={tw(
                                                            'text-sm text-[#063958ff]',
                                                        )}
                                                    >{`${data.mesesALancar}`}</Text>

                                                    <Text
                                                        style={tw(
                                                            'text-sm text-gray-600 ml-[2px]',
                                                        )}
                                                    >{`${
                                                        data.mesesALancar < 2
                                                            ? 'mês de:'
                                                            : 'meses de:'
                                                    }`}</Text>
                                                </div>

                                                <div
                                                    style={tw(
                                                        'flex flex-row items-center justify-between mb-[80px] mr-[12px]',
                                                    )}
                                                >
                                                    <div
                                                        style={tw(
                                                            'bg-[#EEF1F6] h-[25px] rounded-[5px] px-2 flex flex-row items-center ml-[8] mb-[4px] justify-center text-sm gap-x-2 ',
                                                        )}
                                                    >
                                                        <Image
                                                            src={arrowGray}
                                                            style={tw(
                                                                'w-[10px] h-[10px]',
                                                            )}
                                                        />
                                                        <Text
                                                            style={tw(
                                                                'text-sm text-[#00385e] font-bold',
                                                            )}
                                                        >{`${Number(import.meta.env.VITE_DESCONTO_METRAGEM).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                                                    </div>
                                                </div>
                                            </div>

                                            <CrossElement />
                                        </>
                                    )}

                                    <div
                                        style={tw('flex flex-col items-start')}
                                    >
                                        <Text
                                            style={tw(
                                                'text-gray-600 text-base',
                                            )}
                                        >
                                            Última Darf:
                                        </Text>
                                        <div
                                            style={tw(
                                                'bg-[#EEF1F6] h-[25px] rounded-[5px] px-2 flex flex-row items-center justify-center text-sm gap-x-2 ',
                                            )}
                                        >
                                            <Image
                                                src={arrowGray}
                                                style={tw('w-[10px] h-[10px]')}
                                            />
                                            <Text
                                                style={tw(
                                                    'text-sm text-[#00385e] font-bold',
                                                )}
                                            >
                                                {data?.terminoMenorOuIgualQueAtual
                                                    ? Math.round(
                                                          data?.regraAtual,
                                                      ).toLocaleString(
                                                          'pt-BR',
                                                          {
                                                              style: 'currency',
                                                              currency: 'BRL',
                                                          },
                                                      )
                                                    : Math.round(
                                                          data?.valorFinalDaObra,
                                                      ).toLocaleString(
                                                          'pt-BR',
                                                          {
                                                              style: 'currency',
                                                              currency: 'BRL',
                                                          },
                                                      )}
                                            </Text>
                                        </div>
                                        <>
                                            <Text
                                                style={tw(
                                                    'text-gray-600 text-[6px] mt-[2px] font-bold',
                                                )}
                                            >
                                                NO FINAL DA OBRA ESSES
                                            </Text>
                                            <div
                                                style={tw(
                                                    'flex flex-row items-center',
                                                )}
                                            >
                                                <Text
                                                    style={tw(
                                                        'text-sm text-[#00385e] font-bold',
                                                    )}
                                                >
                                                    {!data?.terminoMenorOuIgualQueAtual
                                                        ? `${Math.round(Number(data?.valorFinalDaObra)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
                                                        : Math.round(
                                                              data?.regraAtual,
                                                          ).toLocaleString(
                                                              'pt-BR',
                                                              {
                                                                  style: 'currency',
                                                                  currency:
                                                                      'BRL',
                                                              },
                                                          )}
                                                </Text>

                                                <Text
                                                    style={tw(
                                                        'text-gray-600 ml-[2px] text-[6px] mt-[2px] font-bold',
                                                    )}
                                                >
                                                    PODERÃO SER PAGOS
                                                </Text>
                                            </div>

                                            <Text
                                                style={tw(
                                                    'text-gray-600 ml-[2px] text-[6px] mt-[2px] font-bold',
                                                )}
                                            >
                                                À VISTA OU PARCELADOS EM ATÉ
                                            </Text>

                                            <div
                                                style={tw(
                                                    'flex flex-row items-center border-b-[1px] border-gray-600',
                                                )}
                                            >
                                                <Text
                                                    style={tw(
                                                        'text-[#063958ff] font-bold',
                                                    )}
                                                >{`${data?.valorFinalDaObraParcelamento}`}</Text>
                                                <Text
                                                    style={tw(
                                                        'text-sm font-bold text-gray-600 mt-[6px]  font-bold',
                                                    )}
                                                >
                                                    X
                                                </Text>
                                                <Text
                                                    style={tw(
                                                        'text-[#063958ff] font-bold ml-[4px]',
                                                    )}
                                                >{`${data?.valorDoParcelamentoTotal.toLocaleString(
                                                    'pt-BR',
                                                    {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    },
                                                )}`}</Text>
                                            </div>

                                            <Text
                                                style={tw(
                                                    'text-gray-600 ml-[2px] text-[6px] mt-[6px] font-bold',
                                                )}
                                            >
                                                NO DÉBITO AUTOMÁTICO
                                            </Text>
                                        </>
                                    </div>

                                    <EqualElement />

                                    <div
                                        style={tw(
                                            'flex flex-col mt-[22px]  items-center justify-between',
                                        )}
                                    >
                                        <div
                                            style={tw(
                                                'flex flex-row mb-[4px]  justify-between mr-[16px]',
                                            )}
                                        >
                                            <Text
                                                style={tw(
                                                    'text-sm text-gray-600 mr-[2px]',
                                                )}
                                            >
                                                Total pago:
                                            </Text>
                                        </div>

                                        <div
                                            style={tw(
                                                'flex flex-row items-center justify-between mb-[80px] mr-[12px]',
                                            )}
                                        >
                                            <div
                                                style={tw(
                                                    'bg-[#EEF1F6] h-[25px] rounded-[5px] px-2 flex flex-row items-center ml-[8] mb-[4px] justify-center text-sm gap-x-2 ',
                                                )}
                                            >
                                                <Image
                                                    src={arrowGray}
                                                    style={tw(
                                                        'w-[10px] h-[10px]',
                                                    )}
                                                />
                                                <Text
                                                    style={tw(
                                                        'text-sm text-[#00385e] font-bold',
                                                    )}
                                                >{`${data?.regraAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={tw('flex px-2 w-full mt-[20px]')}>
                            <div
                                style={tw(
                                    'flex flex-row w-[100%] items-center justify-center z-0 h-[100px] border-gray-600 rounded-[5px] px-6  border-[1px] relative',
                                )}
                            >
                                <div
                                    style={tw(
                                        'flex flex-row w-[50%] justify-center items-center border-gray-600 border-[1px] bg-white absolute right-[30%] z-30 top-[-12px] h-[25px] rounded-[5px] px-2',
                                    )}
                                >
                                    <Image
                                        src={arrowGray}
                                        style={tw('w-[10px] h-[10px] mr-2')}
                                    />
                                    <Text
                                        style={tw(
                                            'text-xs text-[#00395e] mt-0',
                                        )}
                                    >
                                        FORMA DE PAGAMENTO DOS NOSSOS HONORÁRIOS
                                    </Text>
                                </div>

                                <div style={tw('flex flex-row justify-center')}>
                                    <div style={tw('flex flex-row')}>
                                        {typeof data?.honorarioValor !==
                                            'string' && (
                                            <>
                                                <div
                                                    style={tw(
                                                        'flex flex-col items-center justify-center ',
                                                    )}
                                                >
                                                    <Text
                                                        style={tw(
                                                            'text-[8px]  text-gray-600 ',
                                                        )}
                                                    >
                                                        PARCELADO (via crédito)
                                                    </Text>

                                                    <div
                                                        style={tw(
                                                            'flex flex-row items-center justify-center gap-x-2 px-4',
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                'text-xl mt-2 text-[#063958ff] ',
                                                            )}
                                                        >
                                                            12
                                                        </Text>
                                                        <Text
                                                            style={tw(
                                                                'text-xl mt-2 text-gray-600 ',
                                                            )}
                                                        >
                                                            x
                                                        </Text>
                                                        <Text
                                                            style={tw(
                                                                'text-xl mt-2 text-[#063958ff] ',
                                                            )}
                                                        >{`${Number(data?.honorarioValor / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div
                                            style={tw(
                                                ' items-center justify-center flex flex-row px-4 gap-x-6',
                                            )}
                                        >
                                            {typeof data?.honorarioValor !==
                                                'string' && (
                                                <>
                                                    <Text
                                                        style={tw(
                                                            'text-[14px] px-[4px]  text-gray-600 border-l border-gray-600 ',
                                                        )}
                                                    >
                                                        À vista com 16,50% de
                                                        desconto
                                                    </Text>
                                                </>
                                            )}

                                            <div
                                                style={tw(
                                                    'bg-[#EEF1F6] h-[25px] rounded-[5px] px-2 flex flex-row items-center justify-center text-sm gap-x-2 ',
                                                )}
                                            >
                                                <Image
                                                    src={arrowGray}
                                                    style={tw(
                                                        'w-[10px] h-[10px]',
                                                    )}
                                                />
                                                <Text
                                                    style={tw(
                                                        'text-sm text-[#00385e] font-bold',
                                                    )}
                                                >{`${(typeof data?.honorarioValor === 'string' && data?.honorarioValor) || Number(data?.honorarioValor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={tw('px-1 flex flex-col items-center')}>
                            <Text
                                style={tw('text-sm text-center text-gray-600')}
                            >
                                RDZZ INTERMEDIAÇÃO DE NEGÓCIOS LTDA - CNPJ
                                54.005.884/0001-04
                            </Text>

                            <Text
                                style={tw('text-sm text-center text-gray-600')}
                            >
                                {' '}
                                {userContext?.franquia?.nome}
                            </Text>
                        </div>

                        {userContext?.franquia?.id && (
                            <div style={tw('px-2')}>
                                <Text
                                    style={tw(
                                        'text-sm text-center text-gray-600',
                                    )}
                                >
                                    Contato:{' '}
                                    {userContext.franquia?.telefone ||
                                        '(XX) XXXX-XXXX'}
                                </Text>
                            </div>
                        )}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};
