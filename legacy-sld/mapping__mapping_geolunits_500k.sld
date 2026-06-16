<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>mapping:mapping_geolunits_500k</sld:Name>
        <sld:UserStyle>
            <sld:Name>mapping_500k_geologic_units_style</sld:Name>
            <sld:Title>Geology_poly</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Qa</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Qa</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fdfced</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Qao</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Qao</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ead3ce</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Qe</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Qe</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fefc9a</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Qg</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Qg</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fefdda</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Ql</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Ql</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f3fdf3</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Qm</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Qm</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f9feef</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Qs</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Qs</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fefbfb</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Qls</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Qls</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f5feda</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Qb</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Qb</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#9b86c5</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Qr</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Qr</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f7a092</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>QT</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>QT</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fef989</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>T5</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>T5</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#efc46b</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>T4</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>T4</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#eac39e</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>T3</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>T3</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fdf7a5</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>T2</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>T2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f1b44c</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>T1</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>T1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fdfa68</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tpb</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tpb</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#6c5d61</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tmb</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tmb</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#a35c64</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tpr</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tpr</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f58d92</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tmr</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tmr</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f6a5a7</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tma</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tma</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f8b0bf</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tmv</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tmv</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fedfdf</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tov</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tov</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f696af</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tvu</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tvu</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f4e9e7</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Ti</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Ti</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fd9fda</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>TK</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>TK</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#b4d57a</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>K3</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>K3</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#90a979</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>K2</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>K2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#b3c493</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>K1</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>K1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#7fa572</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>J2</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>J2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#6f8873</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>J1</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>J1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#a39c8c</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Jg</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Jg</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#b29523</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Ji</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Ji</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f94f6f</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tr2</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tr2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#6faa8c</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Tr1</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>Tr1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#519089</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>P2</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>P2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e0fcfe</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>P1</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>P1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#cedff9</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>PP</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>PP</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#a1bfef</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>P</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>P</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#8780b2</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>M3</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>M3</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#51528e</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>M2</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>M2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#a7a29a</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>M1</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>M1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#746765</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>D</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>D</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#974035</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>S</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>S</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#a44952</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>O</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>O</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#6e4e52</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>C3</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>C3</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fd786a</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>C2</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>C2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fd4a42</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>C1</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>C1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f92d28</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>PCs</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>PCs</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#642b28</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>PCm</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>PCm</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#48323b</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>PCi</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>PCi</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#f93b5a</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>water</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>water</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ffffff</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>playa</sld:Name>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>unit_symbol</ogc:PropertyName>
                            <ogc:Literal>playa</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ffffff</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                    <sld:VendorOption name="inclusion">mapOnly</sld:VendorOption>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>No Legend Provided</sld:Name>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark/>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

