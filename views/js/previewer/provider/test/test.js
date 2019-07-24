/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2018-2019 (original work) Open Assessment Technologies SA ;
 */

/**
 * Test runner provider for the QTI test previewer
 *
 * @author Jean-Sébastien Conan <jean-sebastien@taotesting.com>
 */
define([
    'jquery',
    'i18n',
    'taoTests/runner/areaBroker',
    'taoTests/runner/proxy',
    'taoQtiTestPreviewer/previewer/provider/qtiPreviewer',
    'tpl!taoQtiTestPreviewer/previewer/provider/test/tpl/test'
], function (
    $,
    __,
    areaBrokerFactory,
    proxyFactory,
    qtiPreviewerProvider,
    layoutTpl
) {
    'use strict';

    /**
     * A Test runner provider to be registered against the runner
     */
    return Object.assign({}, qtiPreviewerProvider, {

        //provider name
        name: 'qtiTestPreviewer',

        /**
         * Initialize and load the area broker with a correct mapping
         * @returns {areaBroker}
         */
        loadAreaBroker() {
            const $layout = $(layoutTpl());

            return areaBrokerFactory($layout, {
                contentWrapper: $('.content-wrapper', $layout),
                content: $('#qti-content', $layout),
                toolbox: $('.bottom-action-bar .tools-box', $layout),
                navigation: $('.bottom-action-bar .navi-box-list', $layout),
                control: $('.top-action-bar .control-box', $layout),
                actionsBar: $('.bottom-action-bar .control-box', $layout),
                panel: $('.test-sidebar-left', $layout),
                header: $('.top-action-bar .tools-box', $layout),
                context: $('.top-action-bar .navi-box-list', $layout)
            });
        },

        /**
         * Initialize and load the test runner proxy
         * @returns {proxy}
         */
        loadProxy() {
            const {proxyProvider, serviceCallId, bootstrap, timeout} = this.getConfig();
            return proxyFactory(proxyProvider || 'qtiTestPreviewerProxy', {serviceCallId, bootstrap, timeout});
        },

        /**
         * Initialization of the provider, called during test runner init phase.
         *
         * We install behaviors during this phase (ie. even handlers)
         * and we call proxy.init.
         *
         * @this {runner} the runner context, not the provider
         * @returns {Promise} to chain proxy.init
         */
        init() {
            return qtiPreviewerProvider.init.call(this);
        }
    });
});
